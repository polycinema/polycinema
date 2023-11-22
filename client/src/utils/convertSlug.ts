import slugify from 'slugify' 
export const convertSlug = (str: string) =>{
  return slugify(str,{
    lower: true,
    locale: 'vi'
  })
}