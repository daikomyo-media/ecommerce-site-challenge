import type { PropsWithChildren } from 'react'

export type ContainerProps = PropsWithChildren<{
  className?: string
}>

export function Container({ children, className }: ContainerProps) {
  const composed = ['container mx-auto', className].filter(Boolean).join(' ')
  return <div className={composed}>{children}</div>
}
