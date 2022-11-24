export interface ProductCategoryProps {
  params: string
}

export interface Product {
  productId: number
  productName: string
  specificationGroups: SpecificationGroups[]
  material?: string
}

export interface SpecificationGroups {
  name: string
  specifications: Specification[]
}

export interface Specification {
  name: string
  values: string[]
}
