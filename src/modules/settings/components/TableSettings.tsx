import { useState } from 'react'
import { MopsusTable } from '../../../shared/mopsusTable/MopsusTable'
import styles from '../styles/styles.module.scss'
import { NewOption } from './NewOption';


export const TableSettings = ({ title, mapped, optionsTableColumns, isLoading, set, options, endPoint, goToNextPage, goToPreviousPage, goToFirstPage, goToLastPage }) => {
    const [search, setSearch] = useState(null);
    const [newOption, setNewOption] = useState(false)
    const page = 1


    const handleNewOption = (e) => {
        e.preventDefault();
        setNewOption(true)
    }


    return (
        <div className={styles.settingsContainer}>
            <div className={styles.tableTitleBtnContainer}>
                <p className={styles.title2}>{title}</p>
            </div>
            <section className={styles.tableActionsContainer}>
                <div className={styles.tableSearchComponent}>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        className={styles.tableSearchInput}
                        placeholder="Buscar por nombre..."
                        type="text"
                    />
                    <div>
                        <button className={styles.btnAdd} onClick={handleNewOption}>Agregar</button>
                    </div>
                </div>
            </section>
            <div className={styles.lineContainer}>
                <hr className={styles.lineTable} />
            </div>

            <MopsusTable
                columns={optionsTableColumns}
                goToFirstPage={goToFirstPage}
                goToLastPage={goToLastPage}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                includeOptions={true}
                includePagination={true}
                isLoading={isLoading}
                options={options}
                page={page}
                rows={mapped}
                setRows={set}
                totalPages={() => { }}
            />
            {
                newOption && (
                    <NewOption titleModal={title} onClose={() => setNewOption(false)} endPoint={endPoint} />
                )
            }
        </div >
    )
}