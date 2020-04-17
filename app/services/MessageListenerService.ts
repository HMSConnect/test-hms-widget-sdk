import * as _ from 'lodash'
class MessageListenerServiceFactory {
  private register: any = []
  private iframeName: string | null = null

  registerMessage(action: string, listener: any) {
    this.register.push({ action, listener })
  }

  initialMessageListener() {
    window.addEventListener('message', (event: any) => {
      const action = event.data.action
      const listener = _.find(this.register, data => data.action === action)
      if (listener) {
        listener.listener(event.data.data)
      }
    })
  }

  unRegisterMessage(action: string) {
    const newRegister = this.register.filter(
      (data: any) => data.action === action,
    )
    this.register = newRegister
  }

  setIframeName(iframeName: string) {
    this.iframeName = iframeName
  }

  getIframeName() {
    return this.iframeName
  }

  //   registerMessage(actions: string[], listen) {
  //     window.removeEventListener('message')
  //     window.addEventListener('message', event => {
  //       for (const action of actions) {
  //         if (event.data.action === 'set-theme') {
  //           listen.onSetTheme(data)
  //         }
  //       }
  //     })
  //   }
}

export const MessageListenerService = new MessageListenerServiceFactory()
