using CayGiaPha.Helper;
using System;
using System.Activities.Statements;
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

        // GET: CGP/CreateCGP 
        //[CheckLogin]
        public ActionResult CreateCGP(int? id)
        {
            if (id.HasValue == false)
            {
                return RedirectToAction("Index", "Home");
            }

            using (var ctx = new CGPEntities())
            {
                int idt = int.Parse(id.ToString());
                CurrentContext.SetCurrentTree(idt);
                var model = ctx.Trees.Where(p => p.TreeID == id).FirstOrDefault();
                return View();
            }
        }
        [HttpPost]
        public ActionResult CreateCGP(Member model)
        {
            int x = CurrentContext.GetCurrentTree();
            model.Date_Create = DateTime.Now;
            model.DateOfDeath = DateTime.Now;
            //model.Birthday = DateTime.Now;
            //model.Job = "Cong viec test 1";
            //model.Sex = "M";
            if (model.Sex == null)
                model.Sex = "M";
            model.TypeRelationship = 1;
            model.Memberold = 1;
            //model.BirthPlaceId = 1;
            model.BurialPlaceId = 1;
            model.CauseOfDeath = 1;
            model.TreeID = x;
            //model.AddressID = "Dia chi test 1";
            //model.FullName = "Ho va ten test 1";


            using (CGPEntities ctx = new CGPEntities())
            {

                try
                {
                    ctx.Members.Add(model);
                    ctx.SaveChanges();
                }
                catch (Exception ex)
                {
                    Response.Write("<script LANGUAGE='JavaScript' >alert('Lỗi.')</script>" + ex.ToString());
                }


            }
            return View();
        }
        #region Ajax
        public ActionResult GetControl()
        {
            using (CGPEntities dt = new CGPEntities())
            {
                var Bl = dt.BirthPlaces.Where(b => b.TreeID == 1).ToList();
                var Jo = dt.Jobs.Where(b => b.TreeID == 1).ToList();
                return Json(new { Bl = Bl, Jo = Jo }, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion
    }
}