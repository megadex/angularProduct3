using angularProduct.DBContext;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace angularProduct.Controllers
{
    public class ProductAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(ProductsDB.TblProducts.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]TblProduct value)
        {
            ProductsDB.TblProducts.Add(value);
            return ToJson(ProductsDB.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]TblProduct value)
        {
            ProductsDB.Entry(value).State = EntityState.Modified;
            return ToJson(ProductsDB.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            ProductsDB.TblProducts.Remove(ProductsDB.TblProducts.FirstOrDefault(x => x.ProductId == id));
            return ToJson(ProductsDB.SaveChanges());
        }
    }
}
