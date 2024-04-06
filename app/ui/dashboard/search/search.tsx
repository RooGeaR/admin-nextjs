'use client'
import { MdSearch } from 'react-icons/md'
import styles from './search.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface SearchProps {
  placeholder: string
}

const Search = ({placeholder}: SearchProps) => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)
    const term = e.target.value
    if (term) {
      term.length > 2 && params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params}`)
  }, 300)
  return (
    <div className={styles.container}>
      <MdSearch />
      <input type='text' placeholder={placeholder} className={styles.input} onChange={handleSearch}/>
    </div>
  )
}

export default Search