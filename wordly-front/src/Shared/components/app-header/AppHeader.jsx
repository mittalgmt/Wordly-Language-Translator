import { Disclosure, DisclosureButton } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Translator', href: '#', current: false },
  { name: 'Chat', href: '#', current: false },
  { name: 'Fetures', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="sticky-navbar py-2 bg-white shadow-md">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-12 items-center justify-between">
          
          {/* Logo - Left */}
          <div className="flex items-center flex-shrink-0">
            <span className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="ml-1">Wordly</span>
            </span>
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden sm:flex flex-1 justify-center">
            <div className="flex space-x-10">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-green-600 px-3 py-2 text-sm font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Login Button - Right Corner */}
          <div className="hidden sm:flex items-center">
            <a href="#" className="bg-[#388E3C] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#FFC107]">
              Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block size-6 group-data-open:hidden" aria-hidden="true" />
              <XMarkIcon className="hidden size-6 group-data-open:block" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className="block text-gray-600 hover:bg-gray-100 hover:text-green-600 rounded-md px-3 py-2 text-base font-medium"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  )
}