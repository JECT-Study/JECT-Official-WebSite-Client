# 타입 선언 규약

`packages/jds`에서 타입을 선언하거나 옮길 때 따른다.

## 1. 위치

- 모듈 외부로 export하는 컴포넌트 props 타입은 컴포넌트 폴더의 `*.types.ts`에 둔다.
- export하지 않는 타입은 사용하는 파일에 그대로 둔다. 단일 파일에서만 사용하는 보조 타입은 `*.types.ts`로 옮기지 않는다.
- 파일명은 컴포넌트 이름을 camelCase로 표기하고 `.types.ts`를 붙인다. `checkbox.types.ts`, `selectField.types.ts`.
- 배럴(`index.ts`)은 컴포넌트 파일이 아니라 `*.types.ts`에서 타입을 다시 export한다.

props가 아닌 타입은 `*.types.ts`로 모으지 않는다. 컨텍스트 값은 컨텍스트 모듈에, 훅의 옵션과 반환 타입은 훅 모듈에, 스타일 전용 유니온은 `*.css.ts`에 둔다.

## 2. interface와 type

객체 형태 선언은 `interface`를 기본으로 한다. 근거는 세 가지다.

- TypeScript 공식 Performance 가이드가 `extends` 확장을 권장한다. `extends`로 형성한 관계는 컴파일러가 캐시하지만 intersection은 관계 검사 결과가 캐시되지 않아 반복 계산된다.
- `extends`는 프로퍼티 충돌을 선언 시점에 컴파일 에러로 검출한다. intersection은 양립 불가능한 프로퍼티를 에러 없이 `never`로 만든다.
- 에러 메시지와 IDE 툴팁에 이름이 그대로 표시된다. intersection alias는 규모가 커질수록 프로퍼티가 전부 전개되어 가독성이 떨어진다.

```ts
// 접근 시 name은 never, 선언 시점에는 에러가 없다
type A = { name: string } & { name: number };

// 선언 즉시 컴파일 에러
interface A extends X, Y {}
// TS2320: Interface 'A' cannot simultaneously extend types 'X' and 'Y'.
```

`type`은 다음 경우에만 사용한다.

- 유니온, 그리고 유니온을 포함하는 조합 (4절)
- 다른 타입이나 유틸리티 타입 적용 결과에 부여하는 별칭 (`type TextFieldProps = FieldProps`)
- 3절의 확장 불가 사례

유니온과 조합한다는 이유로 구성 요소까지 `type`으로 선언하지 않는다. 조합에 참여하는 선언이 단일 객체라면 `interface`로 선언한다.

## 3. 확장할 수 없는 경우

다음 두 경우는 `interface`로 전환할 수 없으므로 intersection alias로 유지한다.

- 유니온을 확장하려는 경우. `interface X extends AriaLabelProps`는 `TS2312: An interface can only extend an object type or intersection of object types with statically known members.` 오류가 발생한다.
- 제네릭 타입 파라미터에 의존하는 타입을 확장하려는 경우. `ComponentPropsWithoutRef<E>`나 타입 파라미터 `T` 자체가 여기에 해당한다.

## 4. 유니온이 포함된 props

상호 배타 조합이 필요한 경우 객체 부분을 각각 `interface`로 분리하고 최종 타입만 alias로 결합한다. 유니온의 멤버가 되는 선언도 그 자체는 단일 객체이므로 `interface`로 선언한다. 결합하는 alias에는 프로퍼티를 직접 선언하지 않는다.

```ts
interface CheckboxRootBaseProps {
  size?: CheckboxSize;
  children: ReactNode;
}

interface CheckboxRootControlledProps {
  value: string[];
  defaultValue?: never;
  onChange: (value: string[]) => void;
}

interface CheckboxRootUncontrolledProps {
  value?: never;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

export type CheckboxRootProps = CheckboxRootBaseProps &
  AriaLabelProps &
  (CheckboxRootControlledProps | CheckboxRootUncontrolledProps);
```

## 5. 제출 전 확인

- [ ] export하는 props 타입이 `*.types.ts`에 있는가
- [ ] export하지 않는 타입을 `*.types.ts`로 옮기지 않았는가
- [ ] 배럴이 `*.types.ts`에서 다시 export하는가
- [ ] 단일 객체 선언이 `interface`인가
- [ ] `type`으로 남긴 선언이 2절 목록이나 3절 사례에 해당하는가
