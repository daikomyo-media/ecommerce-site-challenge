export function getStringParam(
  searchParams: URLSearchParams,
  key: string,
): string | null {
  const value = searchParams.get(key)
  return value && value.trim().length > 0 ? value : null
}

export function toggleParam(search: string, key: string, value: string) {
  const params = new URLSearchParams(search)
  const current = params.getAll(key)

  if (current.includes(value)) {
    const next = current.filter((entry) => entry !== value)
    params.delete(key)
    next.forEach((entry) => params.append(key, entry))
  } else {
    params.append(key, value)
  }

  return params.toString()
}

export function setParams(
  search: string,
  entries: Array<[string, string | null | undefined | boolean]>,
) {
  const params = new URLSearchParams(search)

  entries.forEach(([key, value]) => {
    params.delete(key)
    if (typeof value === 'boolean') {
      if (value) params.set(key, 'true')
      return
    }
    if (value === null || value === undefined || value === '') {
      return
    }
    params.set(key, value)
  })

  return params.toString()
}
