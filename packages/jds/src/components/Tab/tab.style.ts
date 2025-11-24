import { sva, type RecipeVariantProps } from './sva';
import { theme } from '../../tokens/theme';

// TODO: 추후 공통화하기
const interactiveSelector =
  '&:not(:is(:disabled, [disabled], [data-disabled], [aria-disabled=true]))';
const disabledSelector = '&:is(:disabled, [disabled], [data-disabled], [aria-disabled=true])';

export const tabStyles = sva({
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
      gap: theme.scheme.semantic.spacing[0],
      position: 'relative',
    },
    trigger: {
      position: 'relative',
      isolation: 'isolate',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.scheme.semantic.spacing[4],
      color: theme.color.semantic.object.alternative,
      cursor: 'pointer',
      '&[data-state="active"]': {
        color: theme.color.semantic.object.bolder,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        backgroundColor: theme.color.semantic.interaction.assistive,
        opacity: 0,
        transition: `opacity ${theme.environment.semantic.duration[100]} ${theme.environment.semantic.motion.fluent}`,
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
        boxShadow: `inset 0 0 0 ${theme.scheme.semantic.strokeWeight[3]} ${theme.color.semantic.interaction.focus}`,
        opacity: theme.scheme.semantic.opacity[100],
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
      borderBottomWidth: theme.scheme.semantic.strokeWeight[2],
      borderBottomStyle: 'solid',
      borderBottomColor: theme.color.semantic.stroke.bold,
      zIndex: 10,
    },
  },
  variants: {
    variant: {
      header: {
        list: {
          borderRadius: theme.scheme.semantic.radius[0],
          borderBottomWidth: theme.scheme.semantic.strokeWeight[1],
          borderBottomStyle: 'solid',
          borderBottomColor: theme.color.semantic.stroke.assistive,
          opacity: theme.scheme.semantic.opacity[100],
        },
        trigger: {
          padding: `${theme.scheme.semantic.spacing[6]} ${theme.scheme.semantic.spacing[12]}`,
          minHeight: '39px',
        },
        indicator: {
          display: 'block',
        },
      },
      content: {
        list: {
          gap: theme.scheme.semantic.spacing[8],
        },
        trigger: {
          padding: `${theme.scheme.semantic.spacing[8]} ${theme.scheme.semantic.spacing[12]}`,
          border: `${theme.scheme.semantic.strokeWeight[1]} solid ${theme.color.semantic.stroke.alpha.subtle}`,
          borderRadius: theme.scheme.semantic.radius[6],
          minHeight: '35px',
        },
        indicator: {
          display: 'none',
          bottom: `calc(-1 * ${theme.scheme.semantic.strokeWeight[1]})`, //list의 borderBottom과 겹치도록 -1로 설정
        },
      },
    },
    layout: {
      hug: {
        list: {
          width: 'auto',
          justifyContent: 'flex-start',
        },
        trigger: {
          flex: 'initial',
        },
      },
      fill: {
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
    layout: 'hug',
  },
});

export type TabVariantProps = RecipeVariantProps<typeof tabStyles>;
