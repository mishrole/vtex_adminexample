import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import ProductsTable from './containers/ProductsTable'
import './styles.global.css'
// import UsersTable from './UsersTable'

const AdminExample: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-example.hello-world" />}
        />
      }
    >
      <PageBlock variation="full">
        <ProductsTable params="1" />
        {/* <UsersTable /> */}
      </PageBlock>
    </Layout>
  )
}

export default AdminExample
