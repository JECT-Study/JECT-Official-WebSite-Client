# 타입 선언 규약

`packages/jds`에서 타입을 선언하거나 옮길 때 따른다.

## 1. 위치

- 모듈 밖으로 export하는 컴포넌트 props 타입은 컴포넌트 폴더의 `*.types.ts`에 둔다.
- export하지 않는 타입은 쓰는 파일에 그대로 둔다. 파일 하나에서만 쓰는 보조 타입을 `*.types.ts`로 옮기지 않는다.
- 파일명은 컴포넌트 이름을 camelCase로 쓰고 `.types.ts`를 붙인다. `checkbox.types.ts`, `selectField.types.ts`.
- 배럴(`index.ts`)은 컴포넌트 파일이 아니라 `*.types.ts`에서 타입을 재export한다.

props가 아닌 타입은 `*.types.ts`로 모으지 않는다. 컨텍스트 값은 컨텍스트 모듈에, 훅의 옵션과 반환 타입은 훅 모듈에, 스타일 전용 유니온은 `*.css.ts`에 둔다.

타입을 옮길 때 순환 참조를 만들지 않는다. 다른 컴포넌트의 타입이 필요하면 배럴 대신 그 컴포넌트의 타입 모듈을 상대 경로로 참조한다. 배럴은 하위 컴포넌트를 다시 export하므로 하위에서 배럴을 참조하면 순환이 생긴다.

## 2. interface와 type

객체 형태 선언은 `interface`를 기본으로 한다. 근거는 셋이다.

- TypeScript 공식 Performance 가이드가 `extends` 확장을 권장한다. `extends`로 맺은 관계는 컴파일러가 캐시하지만 intersection은 관계 검사 결과가 캐시되지 않아 반복 계산된다.
- `extends`는 충돌을 선언 시점에 컴파일 에러로 잡는다. intersection은 양립 불가한 프로퍼티를 에러 없이 `never`로 만든다.
- 에러 메시지와 IDE 툴팁에 이름이 그대로 나온다. intersection alias는 커지면 프로퍼티가 전부 펼쳐져 읽기 어렵다.

```ts
// 접근할 때 name: never, 선언 시점에는 에러가 없다
type A = { name: string } & { name: number };

// 선언 즉시 컴파일 에러
interface A extends X, Y {}
// TS2320: Interface 'A' cannot simultaneously extend types 'X' and 'Y'.
```

`type`은 다음에만 쓴다.

- 유니온, 그리고 유니온을 포함하는 조합 (4절)
- 다른 타입이나 유틸리티 타입 적용 결과에 붙이는 별칭 (`type TextFieldProps = FieldProps`)
- 3절의 확장 불가 사례

유니온과 조합한다는 이유로 그 재료까지 `type`으로 쓰지 않는다. 조합의 재료가 단일 객체라면 `interface`다.

## 3. 확장할 수 없는 경우

다음 둘은 `interface`로 바꿀 수 없으므로 intersection alias로 둔다.

- 유니온을 확장하려는 경우. `interface X extends AriaLabelProps`는 `TS2312: An interface can only extend an object type or intersection of object types with statically known members.`가 난다.
- 제네릭 타입 파라미터에 의존하는 타입을 확장하려는 경우. `ComponentPropsWithoutRef<E>`나 타입 파라미터 `T` 자체가 여기 해당한다.

## 4. 유니온과 섞이는 props

상호 배타 조합이 필요하면 객체 부분을 각각 `interface`로 분리하고, 최종 타입만 alias로 합친다. 유니온의 멤버가 되는 선언도 그 자체는 단일 객체이므로 `interface`로 쓴다. 합치는 alias에는 프로퍼티를 직접 쓰지 않는다.

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
- [ ] 배럴이 `*.types.ts`에서 재export하는가
- [ ] 단일 객체 선언이 `interface`인가
- [ ] `type`으로 남긴 선언이 2절 목록이나 3절 사례에 해당하는가
- [ ] 순환 참조가 생기지 않았는가
