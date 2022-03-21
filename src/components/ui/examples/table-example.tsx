import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'
// import { URLS, BASE_HEADERS } from '../../constants/api'
import { BASE_HEADERS } from '../../../constants/api'

import {
  BodyText,
  Button,
  ButtonGroup,
  elMb6,
  elMb7,
  elSpan2,
  PersistantNotification,
  StatusIndicator,
  Table,
  Title,
  useModal,
} from '@reapit/elements'

export const handleOnCloseModal =
  (setIndexExpandedRow: Dispatch<SetStateAction<number | null>>, closeModal: () => void) => () => {
    setIndexExpandedRow(null)
    closeModal()
  }

export const TableExample: FC = () => {
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const { Modal, openModal, closeModal } = useModal()
  const [properties, setProperties] = useState([])

  const fetchProperties = async () => {
    const response = await fetch('https://platform.reapit.cloud/properties/?marketingMode=selling', {
      method: 'GET',
      headers: {
        ...BASE_HEADERS,
        Authorization:
          'Bearer eyJraWQiOiJFXC9TcnVuTzVCR0xBMk1yT3phY2RjWFkwVVdqRVB1cVB5N3hIb1FWbnJGdz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJmZDQzNDVjMy0zMTkzLTQ4YmQtYTg5ZS1kMGIyNWJmOTE0YTQiLCJjb2duaXRvOmdyb3VwcyI6WyJGb3VuZGF0aW9uc0RldmVsb3BlckFkbWluIiwiRm91bmRhdGlvbnNEZXZlbG9wZXIiXSwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhZ2VuY3lDbG91ZFwvbGFuZGxvcmRzLnJlYWQgYWdlbmN5Q2xvdWRcL29mZmljZXMud3JpdGUgYWdlbmN5Q2xvdWRcL29mZmVycy5yZWFkIGFnZW5jeUNsb3VkXC9wcm9wZXJ0aWVzLndyaXRlIGFnZW5jeUNsb3VkXC9hcHBsaWNhbnRzLndyaXRlIGFnZW5jeUNsb3VkXC90YXNrcy5yZWFkIGFnZW5jeUNsb3VkXC9pZGVudGl0eWNoZWNrcy5yZWFkIGFnZW5jeUNsb3VkXC9wYXltZW50cy5yZWFkIGFnZW5jeUNsb3VkXC9pZGVudGl0eWNoZWNrcy53cml0ZSBhZ2VuY3lDbG91ZFwva2V5cy5yZWFkIGFnZW5jeUNsb3VkXC9sYW5kbG9yZHMud3JpdGUgYWdlbmN5Q2xvdWRcL2NvbnZleWFuY2luZy53cml0ZSBhZ2VuY3lDbG91ZFwvZW5xdWlyaWVzLnJlYWQgYWdlbmN5Q2xvdWRcL3NvdXJjZXMud3JpdGUgb3BlbmlkIHByb2ZpbGUgYWdlbmN5Q2xvdWRcL3BheW1lbnRzLndyaXRlIGFnZW5jeUNsb3VkXC9uZWdvdGlhdG9ycy53cml0ZSBhZ2VuY3lDbG91ZFwvYXBwbGljYW50cy5yZWFkIGFnZW5jeUNsb3VkXC9uZWdvdGlhdG9ycy5yZWFkIGFnZW5jeUNsb3VkXC92ZW5kb3JzLndyaXRlIHBob25lIGFnZW5jeUNsb3VkXC9qb3VybmFsZW50cmllcy5yZWFkIGFnZW5jeUNsb3VkXC9jb21wYW5pZXMud3JpdGUgYWdlbmN5Q2xvdWRcL3Byb3BlcnRpZXMucmVhZCBhZ2VuY3lDbG91ZFwvdmVuZG9ycy5yZWFkIGFnZW5jeUNsb3VkXC9jb250YWN0cy5yZWFkIGFnZW5jeUNsb3VkXC9pbWFnZXMud3JpdGUgYWdlbmN5Q2xvdWRcL2RvY3VtZW50cy53cml0ZSBhZ2VuY3lDbG91ZFwvdGFza3Mud3JpdGUgYWdlbmN5Q2xvdWRcL3RlbmFuY2llcy53cml0ZSBhZ2VuY3lDbG91ZFwvY29tcGFuaWVzLnJlYWQgYWdlbmN5Q2xvdWRcL2VucXVpcmllcy53cml0ZSBhZ2VuY3lDbG91ZFwvY29udmV5YW5jaW5nLnJlYWQgYWdlbmN5Q2xvdWRcL2tleXMud3JpdGUgYWdlbmN5Q2xvdWRcL3dvcmtzb3JkZXJzLndyaXRlIGFnZW5jeUNsb3VkXC9kb2N1bWVudHMucmVhZCBhZ2VuY3lDbG91ZFwvb2ZmZXJzLndyaXRlIGFnZW5jeUNsb3VkXC9qb3VybmFsZW50cmllcy53cml0ZSBhZ2VuY3lDbG91ZFwvYXBwb2ludG1lbnRzLndyaXRlIGFnZW5jeUNsb3VkXC90ZW5hbmNpZXMucmVhZCBlbWFpbCBhZ2VuY3lDbG91ZFwvYXJlYXMud3JpdGUgYWdlbmN5Q2xvdWRcL2NvbnRhY3RzLndyaXRlIGFnZW5jeUNsb3VkXC9pbWFnZXMucmVhZCBhZ2VuY3lDbG91ZFwvd29ya3NvcmRlcnMucmVhZCBhZ2VuY3lDbG91ZFwvb2ZmaWNlcy5yZWFkIGFnZW5jeUNsb3VkXC9hcHBvaW50bWVudHMucmVhZCBhZ2VuY3lDbG91ZFwvdHJhbnNhY3Rpb25zLnJlYWQiLCJhdXRoX3RpbWUiOjE2NDc4NTI2MTQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTIuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0yX2VRN2RyZU56SiIsImV4cCI6MTY0Nzg1NjIxNCwiaWF0IjoxNjQ3ODUyNjE0LCJ2ZXJzaW9uIjoyLCJqdGkiOiI4NDEwZmQ3Ny1mYjFjLTRiYmQtYWJiZS1kZDFmNGUwYjQyZmEiLCJjbGllbnRfaWQiOiI0bDZqMHVucW9sNGswMmJzbDZxODlvZGVtNSIsInVzZXJuYW1lIjoiZmQ0MzQ1YzMtMzE5My00OGJkLWE4OWUtZDBiMjViZjkxNGE0In0.NuBu0qj9JKN14qC_8dT0qJuwtdVogcWj8zZOp3QFng14PHAxHPKuyOo5oHKg8BdRXN7muvLczRg2ZeSDlvUU_rmYcAy5Zp2AZfXUJpAUNDLMj5KbZktzZSKnSGtPHRiucWCA0MKHwe0F_yfTjjdcSNCoxCXQPJoJGRPhqeG3M1V05y0R-hFwqEQcPeTMFO0xKNuQb0pe1Zyc20hhMEVicpE7-mMLJB5Zwcr6w-qDKY5qS7cuZwkHDvhGl0FlgWLPWy4Km56ewzbSHEKzYdIy4Kdac0pPknOOe0wJspxhgVmOZKStPUSRhDMUB4Lrun0SNnJ-0e70RbEM290f4t3jvg',
      },
    })

    const { _embedded } = await response.json()
    setProperties(_embedded)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  return (
    <>
      <Title>Properties for Sale</Title>
      <PersistantNotification className={elMb7} isExpanded intent="secondary" isInline isFullWidth>
        Straight from the Elements docs, the customised table example also has a button in the slide down that triggers
        a Modal dialogue. The custom setIndexExpandedRow function allows a callback to collapse the row when the modal
        is closed.
      </PersistantNotification>
      <Table
        numberColumns={9}
        indexExpandedRow={indexExpandedRow}
        setIndexExpandedRow={setIndexExpandedRow}
        rows={[
          {
            cells: [
              {
                label: 'Property',
                value: 'Mt Ash Jacket, Brassey Road',
                className: elSpan2,
                icon: 'homeSystem',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Customer',
                value: 'Mr Johnny Corrigan',
                icon: 'usernameSystem',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Client A/C',
                value: 'Alternate Lettings Client Acc',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Description',
                value: 'Tenant Payment Request',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Request Date',
                value: '19 Apr 2021',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Amount',
                value: '£50.00',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Payment Status',
                value: 'Not Requested',
                statusCircleIntent: 'danger',
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
            expandableContent: {
              content: (
                <>
                  <BodyText hasGreyText>
                    You may wish to put either calls to action or forms in here that relate to the selected table row.
                  </BodyText>
                  <ButtonGroup alignment="center">
                    <Button intent="primary" chevronRight type="submit" onClick={openModal}>
                      Open Modal
                    </Button>
                  </ButtonGroup>
                </>
              ),
            },
          },
          {
            cells: [
              {
                label: 'Property',
                value: 'Property Name, Road Name',
                className: elSpan2,
                icon: 'homeSystem',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Customer',
                value: 'Mrs Davina Corrigan',
                icon: 'usernameSystem',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Client A/C',
                value: 'Alternate Lettings Client Acc',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Description',
                value: 'Another descriptions',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Request Date',
                value: '23rd Apr 2021',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Amount',
                value: '£665.21',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Payment Status',
                value: 'Pending',
                children: (
                  <>
                    <StatusIndicator intent="critical" /> Pending
                  </>
                ),
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
            expandableContent: {
              content: (
                <>
                  <BodyText hasGreyText>
                    You may wish to put either calls to action or forms in here that relate to the selected table row.
                  </BodyText>
                  <ButtonGroup alignment="center">
                    <Button intent="primary" chevronRight type="submit" onClick={openModal}>
                      Open Modal
                    </Button>
                  </ButtonGroup>
                </>
              ),
            },
          },
        ]}
      />
      <Modal title="Modal Opened">
        <PersistantNotification className={elMb6} isExpanded isInline isFullWidth intent="danger">
          Closing me will collapse the table row
        </PersistantNotification>
        <BodyText hasGreyText>Typically Modals are used to confirm or deny things.</BodyText>
        <ButtonGroup alignment="center">
          <Button intent="secondary" onClick={handleOnCloseModal(setIndexExpandedRow, closeModal)}>
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}

export default TableExample
