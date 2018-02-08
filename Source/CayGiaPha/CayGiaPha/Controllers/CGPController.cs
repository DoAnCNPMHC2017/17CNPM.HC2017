using CayGiaPha.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CayGiaPha.Controllers
{
    public class CGPController : Controller
    {
        // GET: CGP
       
        public ActionResult Index()
        {
            return View();
        }

        // GET: CGP 
        [CheckLogin]
        public ActionResult CreateCGP()
        {
            return View();
        }
        #region Ajax
        public ActionResult GetControl()
        {
            using (CGPEntities dt = new CGPEntities())
            {
                var Bl = dt.BirthPlaces.Where(b => b.TreeID == 1).ToList();
                var Jo = dt.Jobs.Where(b => b.TreeID == 1).ToList();
                return Json(new{Bl=Bl,Jo=Jo}, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion
    }
}