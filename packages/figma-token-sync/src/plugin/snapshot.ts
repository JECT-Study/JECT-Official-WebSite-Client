/** 변수 컬렉션에서 변환에 필요한 정보만 옮긴 값 */
export interface CollectionSnapshot {
  id: string;
  name: string;
  defaultModeId: string;
  modes: { modeId: string; name: string }[];
  /** Figma 변수 패널의 순서를 따릅니다. */
  variableIds: string[];
}

/** 변수에서 변환에 필요한 정보만 옮긴 값 */
export interface VariableSnapshot {
  id: string;
  name: string;
  description: string;
  resolvedType: VariableResolvedDataType;
  variableCollectionId: string;
  valuesByMode: Record<string, VariableValue>;
}

/**
 * @description 현재 파일의 로컬 변수 전체
 *
 * @remarks
 * Figma 객체가 아닌 직렬화할 수 있는 값이라, 변환 로직을 Figma 밖에서도 실행할 수 있습니다.
 */
export interface VariablesSnapshot {
  collections: CollectionSnapshot[];
  variables: VariableSnapshot[];
}

/** 현재 파일의 로컬 변수 컬렉션과 변수를 읽습니다. */
export async function readLocalVariables(): Promise<VariablesSnapshot> {
  const [collections, variables] = await Promise.all([
    figma.variables.getLocalVariableCollectionsAsync(),
    figma.variables.getLocalVariablesAsync(),
  ]);

  return {
    collections: collections.map(collection => ({
      id: collection.id,
      name: collection.name,
      defaultModeId: collection.defaultModeId,
      modes: collection.modes.map(({ modeId, name }) => ({ modeId, name })),
      variableIds: [...collection.variableIds],
    })),
    variables: variables.map(variable => ({
      id: variable.id,
      name: variable.name,
      description: variable.description,
      resolvedType: variable.resolvedType,
      variableCollectionId: variable.variableCollectionId,
      valuesByMode: { ...variable.valuesByMode },
    })),
  };
}
