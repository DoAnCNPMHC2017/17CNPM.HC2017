using CayGiaPha.Helper;
using System;
using System.Activities.Statements;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CayGiaPha.Models;
using System.Globalization;
using CayGiaPha;

namespace CayGiaPha.Controllers
{
    public class CGPController : Controller
    {
        // GET: CGP

        //[CheckLogin]
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

        public ActionResult MemberInfo(int id)
        {
            ViewBag.Id = CurrentContext.GetCurrentTree();
            CGPEntities ctx = new CGPEntities();
            Member model = ctx.Members.Where(p => p.Id == id).FirstOrDefault();

            return View(model);
        }
        [HttpPost]
        public ActionResult MemberInfo(Member m)
        {
            ViewBag.Id = CurrentContext.GetCurrentTree();
            CGPEntities ctx = new CGPEntities();

            Member m2 = ctx.Members.Where(p => p.Id == m.Id).FirstOrDefault();

            m2.FullName = m.FullName;
            m2.Job = m.Job;
            m2.AddressID = m.AddressID;
            m2.Sex = m.Sex;
            m2.Birthday = m.Birthday;
            m2.BirthPlaceId = m.BirthPlaceId;

            ctx.SaveChanges();

            return View(m);
        }
        public JsonResult UpdateMemberInfo(int fid, string fname, int fjob, string faddress, string fsex, string fbirthday, int fbirthplace)
        {
            using (CGPEntities ctx = new CGPEntities())
            {
                try
                {
                    Member m2 = ctx.Members.Where(p => p.Id == fid).FirstOrDefault();
                    m2.FullName = fname;
                    m2.Job = fjob;
                    m2.AddressID = faddress;
                    m2.Sex = fsex;
                    m2.Birthday = DateTime.ParseExact(fbirthday, "dd/MM/yyyy HH:mm:tt", CultureInfo.InvariantCulture);
                    m2.BirthPlaceId = fbirthplace;

                    ctx.SaveChanges();
                    return Json("Cập Nhật Thành Công !", JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
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
                var couple = dt.Database.SqlQuery<Couple>("select A.Id ID1,A.Sex Sex1,ISNULL(B.Id,0) ID2,ISNULL(B.Sex,'') Sex2 from (Select Id,Memberold,Sex from CGP..Member  where TreeID = " + ID + ") A LEFT JOIN (Select ID,Memberold,Sex from CGP..Member where TreeID = " + ID + " AND TypeRelationship <> 0 ) B ON A.ID = ISNULL(B.Memberold,0) OR ISNULL(A.Memberold,0) =B.Id OR ISNULL(A.Memberold,0) =B.Id ").ToList();
                return Json(new { Bl = Bl, Jo = Jo, Bp = Bp, Cod = Cod, OldID = OldID, couple = couple }, JsonRequestBehavior.AllowGet);
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
        //cho nay
        public ActionResult getListMember(int TreeID)
        {
            using (CGPEntities dt = new CGPEntities())
            {
                string Query = "Select  M1.*,Format(Birthday,'dd/MM/yyyy hh:mm') bd" +
                    ",Case when M2.Sex = 'M' THEN M2.FullName ELSE ISNULL(M3.FullName,'') END Fa,Case when M2.Sex = 'F' THEN M2.FullName ELSE ISNULL(M3.FullName,'') END Mo" +
                               " From" +
                               " (Select ID,Generation,FullName,Sex,ISNULL(Memberold,0) Memberold,Birthday from CGP..Member where TreeID = " + TreeID + " AND TypeRelationship = 0 ) AS M1" +
                               " INNER JOIN" +
                               " (Select ID,Memberold,FullName,Sex from CGP..Member where TreeID = " + TreeID + ") AS M2 ON M1.Memberold = M2.Id" +
                               " LEFT JOIN" +
                               " (Select ID,Memberold,FullName from CGP..Member where TreeID = " + TreeID + " AND TypeRelationship = 1   ) AS M3 ON M2.Id = M3.Memberold" +
                               " UNION" +
                               " Select ID,Generation,FullName,Sex,ISNULL(Memberold,0) Memberold,Birthday,Format(Birthday,'dd/MM/yyyy hh:mm') bd,'' Fa,'' Mo from CGP..Member where TreeID =" + TreeID + " AND TypeRelationship != 0 ";
                var kq = dt.Database.SqlQuery<DSMember>(Query).ToList();
                //var kq = dt.Members.FromSql("EXECUTE CGP.dbo.GetMostPopularBlogsForUser {0}", TreeID)
                //    .ToList();
                return Json(kq, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult InfomationMember(string ID, string TreeID)
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
        public JsonResult AddMemberNew(int TreeID, string FName, string DChi, string GTinh, string VLam, string MBOld, int QHe, string NSinh, string NoiSinh, string CDate)
        {
            CGPEntities db = new CGPEntities();
            var Mem = new Member();
            Mem.TreeID = TreeID;
            Mem.FullName = FName;
            Mem.AddressID = DChi;
            Mem.Sex = GTinh;
            if (VLam != "")
                Mem.Job = Int32.Parse(VLam);
            Mem.TypeRelationship = QHe;
            Mem.Birthday = DateTime.ParseExact(NSinh, "dd/MM/yyyy HH:mm", CultureInfo.InvariantCulture);
            Mem.Date_Create = DateTime.Parse(CDate);
            if (NoiSinh != "")
                Mem.BirthPlaceId = Int32.Parse(NoiSinh);
            int SoDoi = 1;
            //neu khong co thanh vien cu (la nguoi đứng đầu gia phả)
            if (MBOld != "")
            {
                var kq = db.Members.Where(b => b.TreeID == TreeID).Select(b => new { Doi = b.Generation }).ToList();
                SoDoi = Int32.Parse(kq[0].Doi.ToString());
                Mem.Memberold = Int32.Parse(MBOld);
            }
            var Doi = QHe == -1 ? 1 : QHe == 1 ? SoDoi : SoDoi + 1;
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