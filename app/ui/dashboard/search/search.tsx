import { MdSearch } from 'react-icons/md'
import styles from './search.module.css'

interface SearchProps {
  placeholder: string
}

const Search = ({placeholder}: SearchProps) => {
  return (
    <div className={styles.container}>
      <MdSearch />
      <input type='text' placeholder={placeholder} className={styles.input} />
    </div>
  )
}

export default Search