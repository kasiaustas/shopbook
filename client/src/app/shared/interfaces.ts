export interface User {
   email: string
   password: string
   role?: string
   registerDate?: Date
   list?: PositionList[]
   country?: string
}

export interface PositionList{
  name: string
  imageSrc: string
  externalLink: string
  description?: string
  _id?: string
}

export interface Message {
  message: string
}

export interface Category {
    name: string
    user?: string
    _id?: string
    active: boolean
}

export interface Position {
  name: string
  imageSrc: string
  externalLink: string
  description: string
  _id?: string
  category: CategoryList[]
  registerDate: Date
  active: boolean
  countryList?: Countries[]
  favorites: number
  advertising: string
}

export interface Countries{
  name: string
}

export interface CategoryList{
  name: string
  _id?: string
}

export interface Filter {
  start?: Date
  end?: Date
  order?: number

}

