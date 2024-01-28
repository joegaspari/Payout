'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Column, Table } from '@tanstack/react-table'
import { ChangeEventHandler } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/data-tables/components/data-table-view-options'
import { DataTableFacetedFilter } from '@/components/data-tables/components/data-table-faceted-filter'
import { MultiOptionFilterType, SearchFilterType } from '@/types/types'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchFilters: SearchFilterType[]
  multiToggleFilters?: MultiOptionFilterType[]
  onSearch: () => void
  loading: boolean
}

export function DataTableToolbar<TData>({
  table,
  searchFilters,
  multiToggleFilters,
  onSearch,
  loading,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchFilters.map((searchFilter) => {
          if (!table.getColumn(searchFilter.column)) {
            return null
          }

          return (
            <Input
              key={searchFilter.column}
              placeholder={searchFilter.placeholder}
              value={
                (table
                  .getColumn(searchFilter.column)
                  ?.getFilterValue() as string) ?? ''
              }
              onChange={(event) =>
                table
                  .getColumn(searchFilter.column)
                  ?.setFilterValue(event.target.value)
              }
              disabled={loading}
              className="h-8 w-[150px] lg:w-[250px]"
            />
          )
        })}
        {multiToggleFilters &&
          multiToggleFilters.map((multiToggleFilter) => {
            if (!table.getColumn(multiToggleFilter.column)) {
              return null
            }

            return (
              <DataTableFacetedFilter
                key={multiToggleFilter.column}
                column={table.getColumn(multiToggleFilter.column)}
                title={multiToggleFilter.title}
                options={multiToggleFilter.options}
                loading={loading}
              />
            )
          })}
        <Button
          className="h-8 px-2 lg:px-3"
          onClick={onSearch}
          disabled={loading}
        >
          Submit
        </Button>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
            disabled={loading}
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} loading={loading} />
    </div>
  )
}
