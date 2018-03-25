using CayGiaPha.Helper;
using System;
using System.Activities.Statements;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CayGiaPha.Models;
using System.Globalization;
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
            ViewBag.Id = id;
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
        public ActionResult GetControl(int ID)
        {
            using (CGPEntities dt = new CGPEntities())
            {
                var Bl = dt.BirthPlaces.Where(b => b.TreeID == ID).ToList();
                var Jo = dt.Jobs.Where(b => b.TreeID == ID).ToList();
                var Bp = dt.BurialPlaces.Where(b => b.TreeID == ID).ToList();
                var Cod = dt.CauseOfDeaths.Where(b => b.TreeID == ID).ToList();
                var OldID = dt.Members.Where(b => b.TreeID == ID && b.TypeRelationship != 1).Select(b => new { ID = b.Id, Name = b.FullName }).ToList();
                return Json(new { Bl = Bl, Jo = Jo, Bp = Bp, Cod = Cod, OldID = OldID }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetMember()
        {
            using (CGPEntities dt = new CGPEntities())
            {
                var m = dt.Members.Where(b => b.TreeID == 1).ToList();
                return Json(m, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult getListMember(int TreeID)
        {
            using (CGPEntities dt = new CGPEntities())
            {
                string Query = "Select  M1.*,Case when M2.Sex = 'M' THEN M2.FullName ELSE ISNULL(M3.FullName,'') END Fa,Case when M2.Sex = 'F' THEN M2.FullName ELSE ISNULL(M3.FullName,'') END Mo" +
                               " From" +
                               " (Select ID,Generation,FullName,Sex,ISNULL(Memberold,0) Memberold,Birthday from CGP..Member where TreeID = " + TreeID + " AND TypeRelationship = 0 ) AS M1" +
                               " INNER JOIN" +
                               " (Select ID,Memberold,FullName,Sex from CGP..Member where TreeID = " + TreeID + ") AS M2 ON M1.Memberold = M2.Id" +
                               " LEFT JOIN" +
                               " (Select ID,Memberold,FullName from CGP..Member where TreeID = " + TreeID + " AND TypeRelationship = 1   ) AS M3 ON M2.Id = M3.Memberold" +
                               " UNION" +
                               " Select ID,Generation,FullName,Sex,ISNULL(Memberold,0) Memberold,Birthday,'' Fa,'' Mo from CGP..Member where TreeID =" + TreeID + " AND TypeRelationship != 0 ";
               var kq = dt.Database.SqlQuery<DSMember>(Query).ToList();
                //var kq = dt.Members.FromSql("EXECUTE CGP.dbo.GetMostPopularBlogsForUser {0}", TreeID)
                //    .ToList();
                return Json(kq, JsonRequestBehavior.AllowGet);
            }        
        }
        public ActionResult InfomationMember(string ID,string TreeID)
        {
            using (CGPEntities dt = new CGPEntities())
            {
                string Query = "Select * From CGP.dbo.Member Where TreeID=" + TreeID + " AND ID =" + ID;
                var kq = dt.Database.SqlQuery<Member>(Query).ToList();
                //int? memberold = kq[0].Memberold;
                //var IdNodept = dt.Database.SqlQuery<int>("Select * From CGP.dbo.Member Where TreeID=" + TreeID + " AND ID =" + ID).ToList();
                //var kq = dt.Members.FromSql("EXECUTE CGP.dbo.GetMostPopularBlogsForUser {0}", TreeID)
                //    .ToList();
                return Json(kq, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult AddMemberNew(int TreeID, string FName, string DChi, string GTinh, int VLam, string MBOld, int QHe, string NSinh, int NoiSinh, string CDate)
        {
            CGPEntities db = new CGPEntities();
            var Mem = new Member();
            Mem.TreeID = TreeID;
            Mem.FullName = FName;
            Mem.AddressID = DChi;
            Mem.Sex = GTinh;
            Mem.Job = VLam;
            if (MBOld != "")
                Mem.Memberold = Int32.Parse(MBOld);
            Mem.TypeRelationship = QHe;
            Mem.Birthday = DateTime.ParseExact(NSinh, "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture);
            Mem.Date_Create = DateTime.Parse(CDate);
            Mem.BirthPlaceId = NoiSinh;
            var kq = db.Members.Where(b => b.TreeID == TreeID).Select(b => new { Doi = b.Generation }).ToList();
            int? SoDoi = kq[0].Doi;
            var Doi = QHe == 1 ? SoDoi : SoDoi + 1;
            Mem.Generation = Doi;
            using (CGPEntities ctx = new CGPEntities())
            {
                try
                {
                    ctx.Members.Add(Mem);
                    ctx.SaveChanges();
                    return Json("Thêm Thành Công !", JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }
        #endregion
    }
}