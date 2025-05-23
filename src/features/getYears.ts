export function getYears() {
  const startYear = 1960
  const currentYear = new Date().getFullYear()
  const years = []

  for (let year = currentYear; year >= startYear; year--) {
    years.push({ name: year.toString(), slug: year.toString() })
  }

  return years
}