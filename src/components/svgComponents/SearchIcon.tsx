export const SearchIcon = ({
  isAbsolute,
  onClick
}: {
  isAbsolute?: boolean
  onClick?: () => void
}) => {
  return (
    <svg
      onClick={onClick}
      className={`cursor-pointer 
      w-24 h-24 
      ${isAbsolute && 'absolute'} right-15 top-32 `}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.00049 2H14.0005V4H6.00049V2ZM4.00049 6V4H6.00049V6H4.00049ZM4.00049 14H2.00049V6H4.00049V14ZM6.00049 16H4.00049V14H6.00049V16ZM14.0005 16V18H6.00049V16H14.0005ZM16.0005 14H14.0005V16H16.0005V18H18.0005V20H20.0005V22H22.0005V20H20.0005V18H18.0005V16H16.0005V14ZM16.0005 6H18.0005V14H16.0005V6ZM16.0005 6V4H14.0005V6H16.0005Z"
        fill="currentColor"
      />
    </svg>
  )
}
