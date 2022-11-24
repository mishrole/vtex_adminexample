import React, { FC, useState } from 'react'
import { Button, Modal } from 'vtex.styleguide'

import { MessageProps } from '../../model/message.model'

export const EmptyState: FC<MessageProps> = ({ params }) => {
  const { subtitle, buttonTitle, buttonDisplayMessage } = params
  const [displayMessage, setDisplayMessage] = useState(false)

  const handleClick = () => {
    setDisplayMessage(!displayMessage)
  }

  return (
    <React.Fragment>
      <p>{subtitle}</p>
      <div className="pt5">
        <Button variation="secondary" size="small" onClick={handleClick}>
          <span className="flex align-baseline">{buttonTitle}</span>
        </Button>
      </div>
      <Modal className="mt5" isOpen={displayMessage} onClose={handleClick}>
        {buttonDisplayMessage}
      </Modal>
    </React.Fragment>
  )
}
