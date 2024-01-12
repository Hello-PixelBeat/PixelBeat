export const CirclePlaySmall = ({
  isWhite,
  isBig
}: {
  isWhite?: boolean
  isBig?: boolean
}) => {
  return (
    <svg
      width={isBig ? '24' : '18'}
      height={isBig ? '24' : '18'}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 0H4V2H2V4H0V14H2V16H4V18H14V16H16V14H18V4H16V2H14V0Z"
        fill={isWhite ? 'white' : 'black'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 14H7V5H9V6.375H11V8.375H13V10.375H11V12.375H9V14Z"
        fill={isWhite ? 'black' : 'white'}
      />
    </svg>
  )
}
