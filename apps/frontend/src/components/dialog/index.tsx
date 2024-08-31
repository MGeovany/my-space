import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { X } from 'react-feather'
import { GhostButton } from '../button'

interface DialogProps {
  trigger?: React.ReactElement
  children?: Function
  title: String
  modalContent: Function
}

export function DialogComponent({
  trigger,
  children,
  title,
  modalContent,
}: DialogProps) {
  let [isOpen, setIsOpen] = useState<boolean>(false)
  let closeButtonRef = useRef<HTMLButtonElement | null>(null)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      {trigger && <div onClick={openModal}>{trigger}</div>}

      {children && children({ closeModal, openModal })}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
          initialFocus={closeButtonRef}
        >
          <div className="min-h-screen px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <Transition.Child
              as={'div'}
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-30"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed bottom-0 left-0 max-h-screen w-full transform-gpu overflow-y-auto rounded-t-xl border  pb-10 border-gray-700 bg-gray-800 shadow-2xl sm:bottom-auto sm:top-1/4 sm:left-1/2 sm:max-w-sm sm:-translate-x-1/2 sm:rounded-xl sm:pb-0 md:max-w-md lg:max-w-lg">
                <div className="flex flex-col">
                  <div className="sticky top-0 flex w-full items-center justify-between border-b py-2 pl-4 pr-2  border-gray-700 bg-gray-800">
                    <Dialog.Title
                      as="h3"
                      className="text-primary text-left text-sm font-semibold"
                    >
                      {title}
                    </Dialog.Title>
                    <GhostButton
                      aria-label="Close dialog"
                      size="small-square"
                      ref={closeButtonRef}
                      onClick={closeModal}
                    >
                      <X size={16} />
                    </GhostButton>
                  </div>
                  <div className="overflow-y-auto">
                    {modalContent({ closeModal, openModal })}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
