const getArrayVal = (arr) => {
  var ans = ""

  for (let i=0; i<arr.length; ++i) {
    ans += arr[i]
    if (i !== arr.length - 1)
        ans += ','
  }
  return (ans)
}

export default getArrayVal;