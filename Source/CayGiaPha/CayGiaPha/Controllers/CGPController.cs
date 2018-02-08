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

        [CheckLogin]
        public ActionResult Index()
        {
            return View();
        }
        //POST: CGP
        [HttpPost]
        public ActionResult Index(Tree model)
        {
            using (CGPEntities ctx = new CGPEntities())
            {

                try
                {
                    string t = model.Name;
                    string t2 = model.TreeID.ToString();
                    model.CreateDate = DateTime.Now;
                    ctx.Trees.Add(model);
                    ctx.SaveChanges();

                    //@ViewBag.Error = false;


                    Response.Write("<script LANGUAGE='JavaScript' >alert('Tạo  cây thành công')</script>");
                    return RedirectToAction("Index", "CGP");
                }
                catch (Exception ex)
                {
                    Response.Write("<script LANGUAGE='JavaScript' >alert('Lỗi.')</script>" + ex.ToString());
                }


            }
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