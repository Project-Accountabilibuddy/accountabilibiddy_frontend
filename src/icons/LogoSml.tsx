import React from 'react'

import { GlobalPallete } from '../global/GlobalTheme'

interface LogoSmallProps {
  className?: string
  fill?: string
}

const LogoSmall = ({
  className,
  fill = GlobalPallete.colors.primary
}: LogoSmallProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 27 27"
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="M26.73 18.15V1.108a.838.838 0 00-.231-.58.848.848 0 00-.592-.245H8.923L.784 0H.643A.643.643 0 000 .644l.283 8.309V25.93a.813.813 0 000 .463c.063.156.19.278.347.335.122.034.25.034.373 0h17.036l8.138.27h.18a.63.63 0 00.463-.192.71.71 0 00.18-.4l-.27-8.257zm-1.35 6.106l-2.79-2.782v-5.552l2.571 2.576.219 5.758zm-4.474-9.442v6.26h-6.262l-.308-6.57 6.57.31zM6.069 12.418V6.132h6.248l.296 6.57-6.544-.284zm14.85-6.273v6.943l-6.648-.297-.295-6.646h6.943zM6.069 21.023v-6.97l6.621.31.309 6.66h-6.93zM25.07 1.933v14.169l-2.507-2.576V5.307a.824.824 0 00-.784-.798h-8.357l-2.494-2.577H25.07zM5.58 4.508L2.816 1.713l5.734.22 2.571 2.576H5.58zM4.423 5.668v5.539L1.85 8.631 1.66 2.873l2.764 2.795zM1.929 25.209V10.95L4.5 13.526v8.244a.71.71 0 000 .4.81.81 0 00.733.424H13.5l2.571 2.577-14.142.038zm19.491-2.576l2.777 2.795-5.734-.206-2.572-2.576 5.529-.013z"
        ></path>
      </g>
    </svg>
  )
}

export default LogoSmall
