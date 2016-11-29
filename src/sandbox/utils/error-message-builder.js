export default function buildErrorMessage(e) {
  const message = `${e.name}: ${e.message}`;
  let line = null;
  let column = null;

  // Safari
  if (e.line != null) {
    line = e.line;

    // FF
  } else if (e.lineNumber != null) {
    line = e.lineNumber;

  // Chrome
  } else if (e.stack) {
    const matched = e.stack.match(/(\d+):(\d+)/);
    if (matched) {
      [line, column] = matched;
    }
  }
  return { message, line: parseInt(line, 10) - 1, column: parseInt(column, 10) };
}