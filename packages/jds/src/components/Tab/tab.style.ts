import { sva } from './sva';
import { theme as t } from '../../tokens/theme';

// TODO: 추후 공통화하기
const interactiveSelector =
  '&:not(:is(:disabled, [disabled], [data-disabled], [aria-disabled=true]))';
const disabledSelector = '&:is(:disabled, [disabled], [data-disabled], [aria-disabled=true])';

export const tabRecipe = sva({
  slots: ['root', 'list', 'trigger', 'content', 'indicator'] as const,
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    list: {
      display: 'flex',
      alignItems: 'center',
      gap: t.scheme.semantic.spacing[0],
      position: 'relative',
    },
    trigger: {
      position: 'relative',
      isolation: 'isolate',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: t.scheme.semantic.spacing[4],
      color: t.color.semantic.object.alternative,
      cursor: 'pointer',
      '&[data-state="active"]': {
        color: t.color.semantic.object.bolder,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        backgroundColor: t.color.semantic.interaction.assistive,
        opacity: 0,
        transition: `opacity ${t.environment.semantic.duration[100]} ${t.environment.semantic.motion.fluent}
          `,
        zIndex: -1,
      },
      [`${interactiveSelector}:hover::after`]: {
        opacity: 0.08,
      },
      [`${interactiveSelector}:active::after`]: {
        opacity: 0.12,
      },
      [`${interactiveSelector}[data-state="active"]::after`]: {
        opacity: 0.12,
      },
      '&:focus': {
        outline: 'none',
        boxShadow: 'none',
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `inset 0 0 0 ${t.scheme.semantic.strokeWeight[3]} ${t.color.semantic.interaction.focus}`,
        opacity: t.scheme.semantic.opacity[100],
      },
      [disabledSelector]: {
        cursor: 'not-allowed',
      },
      [`${disabledSelector}::after`]: {
        opacity: 0.05,
      },
    },
    content: {},
    indicator: {
      position: 'absolute',
      borderWidth: 0,
      borderBottomWidth: t.scheme.semantic.strokeWeight[2],
      borderBottomStyle: 'solid',
      borderBottomColor: t.color.semantic.stroke.bold,
      zIndex: 0,
    },
  },
  variants: {
    variant: {
      header: {
        list: {
          borderRadius: t.scheme.semantic.radius[0],
          borderBottomWidth: t.scheme.semantic.strokeWeight[1],
          borderBottomStyle: 'solid',
          borderBottomColor: t.color.semantic.stroke.assistive,
          opacity: t.scheme.semantic.opacity[100],
        },
        trigger: {
          padding: `${t.scheme.semantic.spacing[6]} ${t.scheme.semantic.spacing[12]}`,
          minHeight: '39px',
        },
      },
      content: {
        list: {
          gap: t.scheme.semantic.spacing[8],
        },
        trigger: {
          padding: `${t.scheme.semantic.spacing[8]} ${t.scheme.semantic.spacing[12]}`,
          border: '1px solid',
          borderColor: t.color.semantic.stroke.alpha.subtle,
          borderRadius: t.scheme.semantic.radius[6],
          minHeight: '35px',
        },
        indicator: {
          display: 'none',
        },
      },
    },
    isItemStretched: {
      false: {
        list: {
          width: 'auto',
          justifyContent: 'flex-start',
        },
        trigger: {
          flex: 'initial',
        },
      },
      true: {
        list: {
          width: '100%',
          alignItems: 'stretch',
          justifyContent: 'space-around',
        },
        trigger: {
          flex: 1,
          width: '100%',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'header',
    isItemStretched: 'false',
  },
});
