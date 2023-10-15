const Notification = ({message}) => {
  if (message == null) {
    return null
  }

  return (
    <div id="wrapper" class="error">
      ♦ {message}
    </div>
  )
}

export default Notification