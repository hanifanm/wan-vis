import styles from './DataTable.module.scss'
import React, { useEffect, useState, Fragment } from 'react'
import cx from 'classnames'

import TableHeaders from '../TableHeaders/TableHeaders'
import TableRow from '../TableRow/TableRow'
import Input from '../Input/Input'
import Loading from '../../Images/loading.gif'
import Button from '../Button/Button'

import SearchIcon from '../../Icons/search.png'
import TableData from '../TableData/TableData'

const DataTable = ({
  className,

  headers,
  data,

  loading,
  isLoadMore,

  keyword,
  setKeyword,

  handleSearch,
  handleSort,
  loadMore,
}) => {

  let [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.onresize = () => setWindowWidth(window.innerWidth)

    return () => {
      window.onresize = null
    }
  }, [])

  function modifiedHandleSort(activeSort, sortType) {
    if (activeSort > 0) {
      handleSort(activeSort - 1, sortType)
    }
  }

  const handleInput = (changeIndex) => (e) => {
    setKeyword(keyword.map((value, index) => index === changeIndex ? e.target.value : value))
  }

  return (
    <div className={cx(className, styles.root)}>
      <div className={styles.container}>

        {windowWidth > 600 && <Fragment>
          {/* HEADER */}
          <TableHeaders
            headers={['No.', ...headers]}
            handleSort={modifiedHandleSort} />

          {/* Filter */}
          <div className={styles.filterRow}>
            <div className={styles.filterContainer}>
              <Button
                onClick={() => handleSearch()}
                className={styles.buttonFilter}>
                <img src={SearchIcon} alt='search' />
              </Button>
            </div>
            {[...headers].map((header, index) => <div
              className={styles.filterContainer}
              key={`${index}--${header}`}>
              <Input
                className={styles.inputFilter}
                value={keyword[index]}
                placeholder={header}
                onChange={handleInput(index)}
              />
            </div>)}
          </div>

          {/* DATA */}
          {data.map((row, index) => {
            return <TableRow
              key={index}
              rowData={[index + 1, ...row]} />
          })}
        </Fragment>}

        {windowWidth <= 600 && <Fragment>
          {data.map((row, index) => {
            return <TableData
              key={index}
              rowData={row}
              label={headers}
            />
          })}
        </Fragment>}

        {/* LOAD MORE */}
        {isLoadMore && <div className={styles.loadMoreRow} onClick={loadMore}>
          {!loading && <span>Load More</span>}
          {loading && <img className={styles.loadingAnimation} src={Loading} alt='Loading' />}
        </div>}

      </div>
    </div>
  )
}

export default DataTable