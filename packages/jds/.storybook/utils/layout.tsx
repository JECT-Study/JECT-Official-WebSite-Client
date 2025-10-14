import styled from '@emotion/styled';

/**
 * Storybook 전용 레이아웃 컴포넌트
 * Stories 파일에서 반복되는 레이아웃 스타일을 재사용하기 위한 유틸리티
 */

export const FlexRow = styled.div<{ gap?: string }>(({ gap = '16px' }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap,
  alignItems: 'center',
}));

export const FlexColumn = styled.div<{ gap?: string }>(({ gap = '24px' }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap,
}));

export const Label = styled.span({
  width: '100px',
});
