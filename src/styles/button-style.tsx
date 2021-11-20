import { css } from '@emotion/react'
import { theme } from './theme'

export const buttonStyle = (
  backgroundColor: string,
  borderColor?: string,
  color = theme.darker
) => css`
  display: block;
  padding: 7px;
  width: 100%;
  color: ${color};
  border: none;
  background: ${backgroundColor};
  font-size: 20px;
  font-weight: 500;
  border: 2px solid ${borderColor ?? 'transparent'};
  letter-spacing: 2px;
`
