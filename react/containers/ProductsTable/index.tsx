/* eslint-disable no-console */
import React, { FC, useEffect, useState } from 'react'
import { useLazyQuery } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { withRuntimeContext } from 'vtex.render-runtime'
import { Table } from 'vtex.styleguide'

import { EmptyState } from '../../components/EmptyState'
import productSearch from '../../graphql/queries/productSearch.gql'
import { Product, ProductCategoryProps } from '../../model/product.model'

const ProductsTable: FC<ProductCategoryProps> = ({ params }) => {
  const [
    productSearchQuery,
    { data: dataProducts, loading: loadingProducts, error: errorProducts },
  ] = useLazyQuery(productSearch)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    productSearchQuery({ variables: { category: params } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  useEffect(() => {
    if (dataProducts) {
      const productsInCategory: Product[] = dataProducts?.productSearch?.products.map(
        (product: Product) => {
          const allSpecifications = product.specificationGroups.find(
            (specificationGroup) =>
              specificationGroup.name === 'allSpecifications'
          )

          let defaultMaterial = ''

          const material = allSpecifications?.specifications.find(
            (specification) => specification.name === 'Material'
          )

          if (material) {
            defaultMaterial = material.values[0]
          }

          return {
            ...product,
            material: defaultMaterial,
          }
        }
      )
      console.info('dataProducts', dataProducts)
      console.info('productsInCategory', productsInCategory)
      setProducts(productsInCategory)
    }

    if (loadingProducts) {
      console.info('loadingProducts', loadingProducts)
    }

    if (errorProducts) {
      console.info('errorProducts', errorProducts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProducts, errorProducts, loadingProducts])

  const defaultSchema = () => {
    return {
      properties: {
        productId: {
          title: 'ID',
        },
        productName: {
          title: 'Nombre',
        },
        material: {
          title: 'Material',
        },
      },
    }
  }

  return (
    <div>
      <Table
        fullWidth
        emptyStateLabel={<FormattedMessage id="admin-example.empty-title" />}
        emptyStateChildren={
          <EmptyState
            params={{
              subtitle: (
                <FormattedMessage id="admin-example.empty-description" />
              ),
              buttonTitle: <FormattedMessage id="admin-example.nice-button" />,
              buttonDisplayMessage: (
                <FormattedMessage id="admin-example.nice-message" />
              ),
            }}
          />
        }
        items={products}
        schema={defaultSchema()}
        onRowClick={({ rowData }: Record<string, never>) => {
          console.info('rowData', rowData)
        }}
      />
    </div>
  )
}

export default withRuntimeContext(ProductsTable)
