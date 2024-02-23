import React, {useState} from 'react'
import {closestCenter, DndContext, DragOverlay, useSensor, useSensors, PointerSensor, KeyboardSensor, useDndContext, MeasuringStrategy, DropAnimation, defaultDropAnimationSideEffects} from '@dnd-kit/core'
import type {DragStartEvent, DragEndEvent, MeasuringConfiguration, UniqueIdentifier} from '@dnd-kit/core'
import {arrayMove, useSortable, SortableContext, sortableKeyboardCoordinates} from '@dnd-kit/sortable'
import {CSS, isKeyboardEvent} from '@dnd-kit/utilities'

import Item, {Position} from './Item'
import type {Props as PageProps} from './Item'
import styles from './item.module.css'

interface Props {
  items: any
  setItems: any
}

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
}

const dropAnimation: DropAnimation = {
  keyframes({transform}) {
    return [
      {transform: CSS.Transform.toString(transform.initial)},
      {
        transform: CSS.Transform.toString({
          scaleX: 0.98,
          scaleY: 0.98,
          x: transform.final.x - 10,
          y: transform.final.y - 10,
        }),
      },
    ]
  },
  sideEffects: defaultDropAnimationSideEffects({
    className: {
      active: styles.active,
    },
  }),
}

export default function DndItems({items, setItems}: Props) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const activeIndex = activeId ? items.map((item) => item.id).indexOf(activeId) : -1
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates}))

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={handleDragCancel} sensors={sensors} collisionDetection={closestCenter} measuring={measuring}>
      <SortableContext items={items}>
        <div className="row">
          {items.map((item, index) => (
            <SortableItem id={item.id} item={item} index={index + 1} key={item.id} activeIndex={activeIndex} onRemove={(id) => setItems(items.filter((item) => item.id !== id))} />
          ))}
        </div>
      </SortableContext>
      <DragOverlay style={{width: '100%'}} dropAnimation={dropAnimation}>
        {activeId ? <ItemOverlay id={activeId} items={items} /> : null}
      </DragOverlay>
    </DndContext>
  )

  function handleDragStart({active}: DragStartEvent) {
    setActiveId(active.id)
  }

  function handleDragCancel() {
    setActiveId(null)
  }

  function handleDragEnd({over}: DragEndEvent) {
    if (over) {
      const overIndex = items.map((item) => item.id).indexOf(over.id)

      if (activeIndex !== overIndex) {
        const newIndex = overIndex

        setItems(arrayMove(items, activeIndex, newIndex))
      }
    }

    setActiveId(null)
  }
}

function ItemOverlay({id, items, ...props}: Omit<PageProps, 'item'> & {items: {id: UniqueIdentifier}[]}) {
  const {activatorEvent, over} = useDndContext()
  const isKeyboardSorting = isKeyboardEvent(activatorEvent)
  const activeIndex = items.map((item) => item.id).indexOf(id)
  const overIndex = over?.id ? items.map((item) => item.id).indexOf(over?.id) : -1

  return <Item id={id} item={items[activeIndex]} {...props} clone insertPosition={isKeyboardSorting && overIndex !== activeIndex ? (overIndex > activeIndex ? Position.After : Position.Before) : undefined} />
}

function SortableItem({item, activeIndex, ...props}: PageProps & {activeIndex: number}) {
  const {attributes, listeners, index, isDragging, isSorting, over, setNodeRef, transform, transition} = useSortable({
    id: item.id,
    animateLayoutChanges: always,
  })

  return (
    <Item
      ref={setNodeRef}
      item={item}
      active={isDragging}
      style={{
        transition,
        transform: isSorting ? undefined : CSS.Translate.toString(transform),
      }}
      insertPosition={over?.id === item.id ? (index > activeIndex ? Position.After : Position.Before) : undefined}
      {...props}
      {...attributes}
      listeners={listeners}
    />
  )
}

function always() {
  return true
}
