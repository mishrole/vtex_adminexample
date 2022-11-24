import { ReactNode } from 'react'

export interface MessageProps {
  params: EmptyStateMessage
}

export interface EmptyStateMessage {
  subtitle: ReactNode | string
  buttonTitle: ReactNode | string
  buttonDisplayMessage: ReactNode | string
}
