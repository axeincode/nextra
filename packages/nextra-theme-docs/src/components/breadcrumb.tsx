import React, { ReactElement } from 'react'
import { Anchor } from './anchor'
import cn from 'clsx'
import { ArrowRightIcon } from 'nextra/icons'
import { Item } from '../utils'

export function Breadcrumb({
  activePath
}: {
  activePath: Item[]
}): ReactElement {
  return (
    <div className="nextra-breadcrumb nx-mt-2.5 nx-flex nx-items-center nx-gap-1 nx-overflow-hidden nx-text-sm nx-text-gray-500 contrast-more:nx-text-current">
      {activePath.map((item, index) => {
        const isLink = !item.children || item.withIndexPage
        const isActive = index === activePath.length - 1

        return (
          <React.Fragment key={item.route + item.name}>
            {index > 0 && <ArrowRightIcon className="nx-w-3.5 nx-shrink-0" />}
            <div
              className={cn(
                'nx-whitespace-nowrap nx-transition-colors',
                isActive
                  ? 'nx-font-medium nx-text-gray-700 contrast-more:nx-font-bold contrast-more:nx-text-current dark:nx-text-gray-400 contrast-more:dark:nx-text-current'
                  : [
                      'nx-min-w-[24px] nx-overflow-hidden nx-text-ellipsis',
                      isLink &&
                        'hover:nx-text-gray-900 dark:hover:nx-text-gray-200'
                    ]
              )}
              title={item.title}
            >
              {isLink && !isActive ? (
                <Anchor href={item.route}>{item.title}</Anchor>
              ) : (
                item.title
              )}
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
