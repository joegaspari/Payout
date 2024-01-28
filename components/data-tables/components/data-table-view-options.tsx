'use client'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { MouseEventHandler, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  loading: boolean
}

export function DataTableViewOptions<TData>({
  table,
  loading,
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = useState(false)

  const closeDropdown = (e: MouseEvent) => {
    e.stopPropagation()
    setOpen(false)
  }

  const openDropdown: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation()
    setOpen(true)
  }

  useEffect(() => {
    window.addEventListener('click', closeDropdown)

    return function cleanup() {
      window.removeEventListener('click', closeDropdown)
    }
  })

  const metaData: any = table.options.meta
  const headerMap = metaData.headerMap

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild disabled={loading}>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          onClick={openDropdown}
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[150px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide(),
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {headerMap.get(column.id)}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
