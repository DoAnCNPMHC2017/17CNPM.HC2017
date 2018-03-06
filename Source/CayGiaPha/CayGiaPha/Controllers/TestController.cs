using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CayGiaPha.Controllers
{
    public class TestController : Controller
    {
        // GET: Test

        public ActionResult Index()
        {

            return View();
        }
        public ActionResult Edit(int Id)
        {
            CGPEntities c = new CGPEntities();
            var mb = c.Members;
            //Get the student from studentList sample collection for demo purpose.
            //You can get the student from the database in the real application
            var std = mb.Where(s => s.Id == Id).FirstOrDefault();

            return View(std);
        }
        public ActionResult Create()
        {
            CGPEntities db = new CGPEntities();
            //Build SelectList
            ViewBag.BPlace = new SelectList(db.BirthPlaces, "BirthPlaceID", "BirthPlaceName");
            ViewBag.BurPlace = new SelectList(db.BurialPlaces, "BurialPlaceID", "BurialPlaceName");
            ViewBag.CoDeath = new SelectList(db.CauseOfDeaths, "CauseOfDeathID", "CauseOfDeathText");
            //List<Job> dpl = db.Jobs.ToList();
            //IEnumerable<SelectListItem> items = db.Jobs.Select(c => new SelectListItem { Value = c.JobID.ToString(), Text = c.JobName });
            //ViewBag.Job = items;
            ViewBag.Job = new SelectList(db.Jobs, "JobID", "JobName");
            return View();
        }
        [HttpPost]
        public ActionResult Create(Member m)
        {
            CGPEntities db = new CGPEntities();
            //Build SelectList
            ViewBag.BPlace = new SelectList(db.BirthPlaces, "BirthPlaceID", "BirthPlaceName");
            ViewBag.BurPlace = new SelectList(db.BurialPlaces, "BurialPlaceID", "BurialPlaceName");
            ViewBag.CoDeath = new SelectList(db.CauseOfDeaths, "CauseOfDeathID", "CauseOfDeathText");
            ViewBag.Job = new SelectList(db.Jobs, "JobID", "JobName");

            //Chỗ này chưa xử lý nen để mặc định
            m.Date_Create = DateTime.Now;
            m.Memberold = 1;
            m.TreeID = 1;
            m.TypeRelationship = 1;

            var t = m;
            using (CGPEntities ctx = new CGPEntities())
            {
                try
                {
                    ctx.Members.Add(m);
                    ctx.SaveChanges();

                    //@ViewBag.Error = false;

                    Response.Write("<script LANGUAGE='JavaScript' >alert('OK')</script>");

                }
                catch (Exception ex)
                {
                    Response.Write("<script LANGUAGE='JavaScript' >alert('Lỗi.')</script>" + ex.ToString());
                }
            }
            return View();
        }
    }
}