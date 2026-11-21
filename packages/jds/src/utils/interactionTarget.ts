export const INTERACTION_TARGET_ATTRIBUTE = "data-interaction-target";

export const interactionTargetSelector = `[${INTERACTION_TARGET_ATTRIBUTE}]`;

/**
 * 상태 위임 구조의 root가 직계 자식 interaction target의 비활성 상태를 읽는 선택자.
 * `<fieldset disabled>`처럼 prop 밖에서 비활성이 되면 root에는 `data-disabled`가 붙지 않으므로 함께 확인한다.
 */
export const interactionTargetDisabledSelector = `:has(> ${interactionTargetSelector}:disabled)`;
