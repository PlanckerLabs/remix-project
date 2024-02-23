import React, {forwardRef, CSSProperties} from 'react'
import classNames from 'classnames'

import styles from './action.module.css'

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  cursor?: CSSProperties['cursor']
}

export const Action = forwardRef<HTMLButtonElement, Props>(({className, cursor, style, ...props}, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={classNames(styles.Action, className)}
      tabIndex={0}
      style={
        {
          ...style,
          cursor,
        } as CSSProperties
      }
    />
  )
})
