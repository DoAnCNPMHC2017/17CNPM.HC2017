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

        [CheckLogin]
        public ActionResult Index()
        {
            ViewBag.Tit = "Quản lý Gia Tộc";
            ViewBag.Show = 1;
            ViewBag.Link = "/CGP";
            ViewBag.Name = "CGP";
            ViewBag.Name2 = "Index";
            using (CGPEntities ctx = new CGPEntities())
            {
                int id = 0;
                id = int.Parse(Session["IdUser"].ToString());
                List<Tree> List = ctx.Trees.Where(p =>p.AccountID == id).ToList();
                return View(List);
            }            
        }
        //POST: CGP
        //[HttpPost]
        [CheckLogin]
        public ActionResult AddTree(string treename)
        {
            using (CGPEntities ctx = new CGPEntities())
            {

                try
                {
                    Tree t = new Tree();
                    t.Name = treename;
                    t.AccountID = Int32.Parse(Session["IdUser"].ToString());
                    t.CreateDate = DateTime.Now;
                    ctx.Trees.Add(t);
                    ctx.SaveChanges();
                    //string Query1 = "Select TreeID From CGP..Tree Where AccountID=" + Session["IdUser"].ToString();
                    //Session["ListTree"] = ctx.Database.SqlQuery<int>(Query1).ToList();

                    string Query = "Select Max(TreeID) From Tree Where AccountID=" + Session["IdUser"].ToString();
                    var kq = ctx.Database.SqlQuery<int>(Query).ToList();
                    //@ViewBag.Error = false;
                    //Auto create
                    ctx.ListAchievements.Add(new ListAchievement { AchievementName = "Giải Thể Thao", TreeID = kq[0] });
                    ctx.ListAchievements.Add(new ListAchievement { AchievementName = "Giải Văn Học", TreeID = kq[0] });
                    ctx.ListAchievements.Add(new ListAchievement { AchievementName = "Giải Toán Học", TreeID = kq[0] });
                    ctx.ListAchievements.Add(new ListAchievement { AchievementName = "Doanh Nhân Giỏi", TreeID = kq[0] });
                    ctx.ListAchievements.Add(new ListAchievement { AchievementName = "Thành tích Địa Phương", TreeID = kq[0] });
                    ctx.ListAchievements.Add(new ListAchievement { AchievementName = "Đạt giải Quốc Gia", TreeID = kq[0] });
                    ctx.ListAchievements.Add(new ListAchievement { AchievementName = "Đỗ Tú Tài", TreeID = kq[0] });
                    ctx.ListAchievements.Add(new ListAchievement { AchievementName = "Đỗ Thi Hương", TreeID = kq[0] });
                    ctx.ListAchievements.Add(new ListAchievement { AchievementName = "Đỗ Trạng Nguyên", TreeID = kq[0] });
                    ctx.ListAchievements.Add(new ListAchievement { AchievementName = "Khác", TreeID = kq[0] });
                    ctx.SaveChanges();
                    //
                    ctx.CauseOfDeaths.Add(new CauseOfDeath { CauseOfDeathText = "Tai Nạn Nghê Nghiệp", TreeID = kq[0] });
                    ctx.CauseOfDeaths.Add(new CauseOfDeath { CauseOfDeathText = "Bệnh Già", TreeID = kq[0] });
                    ctx.CauseOfDeaths.Add(new CauseOfDeath { CauseOfDeathText = "Bệnh Dịch", TreeID = kq[0] });
                    ctx.CauseOfDeaths.Add(new CauseOfDeath { CauseOfDeathText = "Tai Nạn Giao Thông", TreeID = kq[0] });
                    ctx.CauseOfDeaths.Add(new CauseOfDeath { CauseOfDeathText = "Lũ Lụt", TreeID = kq[0] });
                    ctx.CauseOfDeaths.Add(new CauseOfDeath { CauseOfDeathText = "Nạn Đói", TreeID = kq[0] });
                    ctx.CauseOfDeaths.Add(new CauseOfDeath { CauseOfDeathText = "Chiến tranh", TreeID = kq[0] });
                    ctx.CauseOfDeaths.Add(new CauseOfDeath { CauseOfDeathText = "Động đất", TreeID = kq[0] });
                    ctx.CauseOfDeaths.Add(new CauseOfDeath { CauseOfDeathText = "Sóng Thần", TreeID = kq[0] });
                    ctx.CauseOfDeaths.Add(new CauseOfDeath { CauseOfDeathText = "Sạt Lở", TreeID = kq[0] });
                    ctx.CauseOfDeaths.Add(new CauseOfDeath { CauseOfDeathText = "Bão", TreeID = kq[0] });
                    ctx.CauseOfDeaths.Add(new CauseOfDeath { CauseOfDeathText = "Núi Lửa Phun Trào", TreeID = kq[0] });
                    ctx.SaveChanges();
                    //
                    var T = new BirthPlace();
                    ctx.BurialPlaces.Add(new BurialPlace { BurialPlaceName = "Nơi Mất 1", TreeID = kq[0] });
                    ctx.BurialPlaces.Add(new BurialPlace { BurialPlaceName = "Nơi Mất 2", TreeID = kq[0] });
                    ctx.BurialPlaces.Add(new BurialPlace { BurialPlaceName = "Nơi Mất 3", TreeID = kq[0] });
                    ctx.SaveChanges();
                    // Nghề nghiệp
                    ctx.Jobs.Add(new Job { JobName = "Giáo Viên", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Bác Sĩ", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Kỹ Sư", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Kinh Doanh", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Công Nhân", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Nghề Nông", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Đánh Bắt Hải Sản ", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Công An", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Y Tá", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Nội Trợ", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Thợ Mộc", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Thợ Bạc", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Thợ Điên", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Lập Trình Viên", TreeID = kq[0] });
                    ctx.Jobs.Add(new Job { JobName = "Kiến Trúc Sư", TreeID = kq[0] });
                    ctx.SaveChanges();
                    //Quê quán
                    ctx.BirthPlaces.Add(new BirthPlace { BirthPlaceName = "TP.HCM", TreeID = kq[0] });
                    ctx.BirthPlaces.Add(new BirthPlace { BirthPlaceName = "Hà Nội", TreeID = kq[0] });
                    ctx.BirthPlaces.Add(new BirthPlace { BirthPlaceName = "Đà Nẳng", TreeID = kq[0] });
                    ctx.BirthPlaces.Add(new BirthPlace { BirthPlaceName = "Long An", TreeID = kq[0] });
                    ctx.SaveChanges();
                    //
                    return Json(new { success = true, responseText = "success" }, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    
                }


            }
            return Json(new { success = false, responseText = "error" }, JsonRequestBehavior.AllowGet);
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
        [CheckLogin]
        public ActionResult FamilyTree(int? id)
        {
            ViewBag.Tit = "Quản lý thành viên";
            ViewBag.Show = 1;
            ViewBag.Name = "CGP";
            ViewBag.Link = "../";
            ViewBag.Name2 = "FamilyTree";
            if (id.HasValue == false)
            {
                return RedirectToAction("Index", "Home");
            }
            ViewBag.Id = id;
            using (var ctx = new CGPEntities())
            {
                int idt = int.Parse(id.ToString());
                CurrentContext.SetCurrentTree(idt);
                int AccID = int.Parse(Session["IdUser"].ToString());
                var model = ctx.Trees.Where(p => p.TreeID == id && p.AccountID == AccID).ToList();
                if (model.Count() > 0)
                    Session["NameTree"] = "Gia tộc "+model[0].Name.ToString();
                else
                {
                    Session["NameTree"] = "";
                    return RedirectToAction("Index", "CGP");
                }                 
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
        public ActionResult Report(int? id)
        {
            Session["NameTree"] = "";
            ViewBag.Tit = "Lập báo cáo";
            ViewBag.Show = 1;
            ViewBag.Name = "FamilyTree";
            ViewBag.Link = id.HasValue == false? "../" : "/CGP/FamilyTree/?id=" + id.ToString();
            ViewBag.Name2 = "Report";
            if (id.HasValue == false)
            {
                return RedirectToAction("Index", "Home");
            }
            int AccID = int.Parse(Session["IdUser"] == null ? "-1" : Session["IdUser"].ToString());
            using (var ctx = new CGPEntities())
            {
                var model = ctx.Trees.Where(p => p.TreeID == id && p.AccountID == AccID).ToList();
                if (model.Count() ==  0)
                {
                    return RedirectToAction("Index", "Home");
                }
                Session["NameTree"] = "Gia tộc " + model[0].Name.ToString();
            }
            ViewBag.Id = id;
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
        public JsonResult UpdateMemberAchievement(int fid, int fach, string fdate)
        {
            using (CGPEntities ctx = new CGPEntities())
            {
                try
                {
                    AchievementDetail a = new AchievementDetail();
                    a.MemberID = fid;
                    a.AchievementID = fach;
                    a.DateIncurred = DateTime.ParseExact(fdate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                    a.TreeID = CurrentContext.GetCurrentTree();
                    ctx.AchievementDetails.Add(a);
                    ctx.SaveChanges();
                    return Json("Cập Nhật Thành Công !", JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public JsonResult UpdateMemberInfo2(int fid, string fdod, int fbp, int fcod)
        {
            using (CGPEntities ctx = new CGPEntities())
            {
                try
                {
                    Member m = ctx.Members.Where(p => p.Id == fid).FirstOrDefault();
                    m.DateOfDeath = DateTime.ParseExact(fdod, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                    m.BurialPlaceId = fbp;
                    m.CauseOfDeath = fcod;
                    ctx.SaveChanges();
                    return Json("Cập Nhật Thành Công !", JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public ActionResult AddJob(string jobname)
        {
            using (CGPEntities ctx = new CGPEntities())
            {
                try
                {
                    Job j = new Job();
                    j.JobName = jobname;
                    j.TreeID = CurrentContext.GetCurrentTree();
                    ctx.Jobs.Add(j);
                    ctx.SaveChanges();
                    return Json("Thêm Thành Công !", JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public ActionResult AddBirthPlace(string bpname)
        {
            using (CGPEntities ctx = new CGPEntities())
            {
                try
                {
                    BirthPlace b = new BirthPlace();
                    b.BirthPlaceName = bpname;
                    b.TreeID = CurrentContext.GetCurrentTree();
                    ctx.BirthPlaces.Add(b);
                    ctx.SaveChanges();
                    return Json("Thêm Thành Công !", JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public ActionResult GetJobs()
        {
            using (CGPEntities dt = new CGPEntities())
            {
                int t = CurrentContext.GetCurrentTree();
                var m = dt.Jobs.Where(b => b.TreeID == t).ToList();
                return Json(m, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult UpdateJob(int jID, string jName)
        {
            using (CGPEntities dt = new CGPEntities())
            {
                int t = CurrentContext.GetCurrentTree();
                Job m = dt.Jobs.Where(j => j.TreeID == t && j.JobID == jID).FirstOrDefault();
                m.JobName = jName;

                dt.SaveChanges();
                return Json(m, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetBP()
        {
            using (CGPEntities dt = new CGPEntities())
            {
                int t = CurrentContext.GetCurrentTree();
                var m = dt.BirthPlaces.Where(b => b.TreeID == t).ToList();
                return Json(m, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult UpdateBP(int jID, string jName)
        {
            using (CGPEntities dt = new CGPEntities())
            {
                int t = CurrentContext.GetCurrentTree();
                BirthPlace m = dt.BirthPlaces.Where(j => j.TreeID == t && j.BirthPlaceID == jID).FirstOrDefault();
                m.BirthPlaceName = jName;

                dt.SaveChanges();
                return Json(m, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult AddCod(string jName)
        {
            using (CGPEntities ctx = new CGPEntities())
            {
                try
                {
                    CauseOfDeath b = new CauseOfDeath();
                    b.CauseOfDeathText = jName;
                    b.TreeID = CurrentContext.GetCurrentTree();
                    ctx.CauseOfDeaths.Add(b);
                    ctx.SaveChanges();
                    return Json("Thêm Thành Công !", JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public ActionResult GetCod()
        {
            using (CGPEntities dt = new CGPEntities())
            {
                int t = CurrentContext.GetCurrentTree();
                var m = dt.CauseOfDeaths.Where(b => b.TreeID == t).ToList();
                return Json(m, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult UpdateCod(int jID, string jName)
        {
            using (CGPEntities dt = new CGPEntities())
            {
                int t = CurrentContext.GetCurrentTree();
                CauseOfDeath m = dt.CauseOfDeaths.Where(j => j.TreeID == t && j.CauseOfDeathID == jID).FirstOrDefault();
                m.CauseOfDeathText = jName;

                dt.SaveChanges();
                return Json(m, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult AddBrP(string jName)
        {
            using (CGPEntities ctx = new CGPEntities())
            {
                try
                {
                    BurialPlace b = new BurialPlace();
                    b.BurialPlaceName = jName;
                    b.TreeID = CurrentContext.GetCurrentTree();
                    ctx.BurialPlaces.Add(b);
                    ctx.SaveChanges();
                    return Json("Thêm Thành Công !", JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public ActionResult GetBrP()
        {
            using (CGPEntities dt = new CGPEntities())
            {
                int t = CurrentContext.GetCurrentTree();
                var m = dt.BurialPlaces.Where(b => b.TreeID == t).ToList();
                return Json(m, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult UpdateBrP(int jID, string jName)
        {
            using (CGPEntities dt = new CGPEntities())
            {
                int t = CurrentContext.GetCurrentTree();
                BurialPlace m = dt.BurialPlaces.Where(j => j.TreeID == t && j.BurialPlaceID == jID).FirstOrDefault();
                m.BurialPlaceName = jName;

                dt.SaveChanges();
                return Json(m, JsonRequestBehavior.AllowGet);
            }
        }
        #region function
        public static int CheckTreeOld(string TreeID, List<int> List)
        {
            int Tree = TreeID == "" ? 0 : Int32.Parse(TreeID);
            for (int i = 0; i < List.Count(); i++)
            {
                if (List[i] == Tree)
                    return 0;
            }
            return 1;
        }
        #endregion
        #region Ajax
        public ActionResult GetControl(int ID)
        {
            using (CGPEntities dt = new CGPEntities())
            {
                var Ach = dt.ListAchievements.Where(b => b.TreeID == ID).ToList();
                var Bl = dt.BirthPlaces.Where(b => b.TreeID == ID).ToList();
                var Jo = dt.Jobs.Where(b => b.TreeID == ID).ToList();
                var Bp = dt.BurialPlaces.Where(b => b.TreeID == ID).ToList();
                var Cod = dt.CauseOfDeaths.Where(b => b.TreeID == ID).ToList();
                var OldID = dt.Members.Where(b => b.TreeID == ID && b.TypeRelationship != 1).Select(b => new { ID = b.Id, Name = b.FullName }).ToList();
                var couple = dt.Database.SqlQuery<Couple>("select A.Id ID1,A.Sex Sex1,ISNULL(B.Id,0) ID2,ISNULL(B.Sex,'') Sex2 from (Select Id,Memberold,Sex from Member  where TreeID = " + ID + ") A LEFT JOIN (Select ID,Memberold,Sex from Member where TreeID = " + ID + " AND TypeRelationship = 1 ) B ON A.ID = ISNULL(B.Memberold,0) OR ISNULL(A.Memberold,0) =B.Id").ToList();
                return Json(new { Ach = Ach, Bl = Bl, Jo = Jo, Bp = Bp, Cod = Cod, OldID = OldID, couple = couple }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetMember()
        {
            using (CGPEntities dt = new CGPEntities())
            {
                int t = CurrentContext.GetCurrentTree();
                var m = dt.Members.Where(b => b.TreeID == t).ToList();
                return Json(m, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetAchievement()
        {
            using (CGPEntities dt = new CGPEntities())
            {
                int t = CurrentContext.GetCurrentTree();
                var m = dt.ListAchievements.Where(b => b.TreeID == t).ToList();
                return Json(m, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetBurialPlace()
        {
            using (CGPEntities dt = new CGPEntities())
            {
                int t = CurrentContext.GetCurrentTree();
                var m = dt.BurialPlaces.Where(b => b.TreeID == t).ToList();
                return Json(m, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult UpdateMemberEnd(int fid,string fdod, int fbp, int fcod)
        //public JsonResult UpdateMemberEnd(), DateTime fdod
        {
            //int fid=1, fbp=1, fcod=1;
            //DateTime fdod = new DateTime();
            using (CGPEntities ctx = new CGPEntities())
            {
                try
                {
                    Member m = ctx.Members.Where(p => p.Id == fid).FirstOrDefault();
                    m.DateOfDeath = DateTime.ParseExact(fdod, "dd/MM/yyyy HH:mm:tt", CultureInfo.InvariantCulture);
                    //m.DateOfDeath = fdod;
                    m.BurialPlaceId = fbp;
                    m.CauseOfDeath = fcod;
                    ctx.SaveChanges();
                    return Json("Cập Nhật Thành Công !", JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }
        //cho nay
        public ActionResult getListMember(int TreeID,int Tcuu, string Ten,string FDate,string TDate)
        {
            string Where = "";
                if(Tcuu == 1)
                {
                    Where = "AND FullName Like '%" + Ten + "%' AND Year(Birthday) BETWEEN " + FDate + " AND " + TDate;
                }
            using (CGPEntities dt = new CGPEntities())
            {
                string Query = "Select  M1.*,Format(Birthday,'dd/MM/yyyy HH:mm') bd" +
                    ",Case when M2.Sex = 'M' THEN M2.FullName ELSE ISNULL(M3.FullName,'') END Fa,Case when M2.Sex = 'F' THEN M2.FullName ELSE ISNULL(M3.FullName,'') END Mo" +
                               " From" +
                               " (Select ID,Generation,FullName,Sex,ISNULL(Memberold,0) Memberold,Birthday from Member where TreeID = " + TreeID + " AND TypeRelationship = 0 " + Where + ") AS M1" +
                               " INNER JOIN" +
                               " (Select ID,Memberold,FullName,Sex from Member where TreeID = " + TreeID + ") AS M2 ON M1.Memberold = M2.Id" +
                               " LEFT JOIN" +
                               " (Select ID,Memberold,FullName from Member where TreeID = " + TreeID + " AND TypeRelationship = 1   ) AS M3 ON M2.Id = M3.Memberold" +
                               " UNION" +
                               " Select ID,Generation,FullName,Sex,ISNULL(Memberold,0) Memberold,Birthday,Format(Birthday,'dd/MM/yyyy HH:mm') bd,'' Fa,'' Mo from Member where TreeID =" + TreeID + " AND TypeRelationship != 0 " + Where ;
                var kq = dt.Database.SqlQuery<DSMember>(Query).ToList();
                //var kq = dt.Members.FromSql("EXECUTE CGP.dbo.GetMostPopularBlogsForUser {0}", TreeID)
                //    .ToList();
                return Json(kq, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult InfomationMember(string ID)
        {
            using (CGPEntities dt = new CGPEntities())
            {                
                try
                {
                    string Query = "Select * From Member Where ID =" + ID;
                    var kq = dt.Database.SqlQuery<Member>(Query).ToList();
                    //int? memberold = kq[0].Memberold;
                    //var IdNodept = dt.Database.SqlQuery<int>("Select * From CGP.dbo.Member Where TreeID=" + TreeID + " AND ID =" + ID).ToList();
                    //var kq = dt.Members.FromSql("EXECUTE CGP.dbo.GetMostPopularBlogsForUser {0}", TreeID)
                    //    .ToList();
                    return Json(kq, JsonRequestBehavior.AllowGet);
                }
                catch (Exception)
                {
                    
                }
                
                return Json(null, JsonRequestBehavior.AllowGet);
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
            Mem.Birthday = DateTime.ParseExact(NSinh, "dd/MM/yyyy HH:mm:tt", CultureInfo.InvariantCulture);
            Mem.Date_Create = DateTime.ParseExact(CDate, "dd/MM/yyyy HH:mm:tt", CultureInfo.InvariantCulture);
            if (NoiSinh != "")
                Mem.BirthPlaceId = Int32.Parse(NoiSinh);
            int SoDoi = 1;
            //neu khong co thanh vien cu (la nguoi đứng đầu gia phả)
            if (MBOld != "")
            {
                int tempID =Int32.Parse(MBOld);
                var kq = db.Members.Where(b => b.TreeID == TreeID && b.Id == tempID).Select(b => new { Doi = b.Generation }).ToList();
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
        [HttpPost]
        public JsonResult UpdateMemberNew(int ID, int TreeID, string FName, string DChi, string GTinh, string VLam, string MBOld, int QHe, string NSinh, string NoiSinh, string CDate, string NgayMat, string NoiMat, string NNMat)
        {
            using (CGPEntities ctx = new CGPEntities())
            {
                try
                {
                    var Mem = ctx.Members.Where(p => p.Id == ID).FirstOrDefault();
                    //Mem.TreeID = TreeID;
                    Mem.FullName = FName;
                    Mem.AddressID = DChi;
                    Mem.Sex = GTinh;
                    if (VLam != "")
                        Mem.Job = Int32.Parse(VLam);
                    else
                        Mem.Job = null;
                    Mem.TypeRelationship = QHe;
                    Mem.Birthday = DateTime.ParseExact(NSinh, "dd/MM/yyyy HH:mm:tt", CultureInfo.InvariantCulture);
                    Mem.Date_Create = DateTime.ParseExact(CDate, "dd/MM/yyyy HH:mm:tt", CultureInfo.InvariantCulture);
                    if (NoiSinh != "")
                        Mem.BirthPlaceId = Int32.Parse(NoiSinh);
                    else
                        Mem.BirthPlaceId = null;
                    if (NgayMat != "")
                        Mem.DateOfDeath = DateTime.ParseExact(NgayMat, "dd/MM/yyyy HH:mm:tt", CultureInfo.InvariantCulture);
                    else
                        Mem.DateOfDeath = null;
                    if (NoiMat != "")
                        Mem.BurialPlaceId = Int32.Parse(NoiMat);
                    else
                        Mem.BurialPlaceId = null;
                    if (NNMat != "")
                        Mem.CauseOfDeath = Int32.Parse(NNMat);
                    else
                        Mem.CauseOfDeath = null;
                    ctx.SaveChanges();
                    return Json("Cập nhật thành công !", JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    return Json(ex.Message, JsonRequestBehavior.AllowGet);
                }
            }
        }
        public JsonResult GetReportMember(string TreeID, string Year, string Year1, int Type)
        {
                using (CGPEntities dt = new CGPEntities())
                {
                    if( Type == 0)
                    { 
                        string Query = "Select row_number() OVER (ORDER BY Nam) STT,Nam,Sum(S) SlS,Sum(KH) SlKH,Sum(MT) SlMT" +
                                       " FROM" +
                                       "(" +
                                           " Select Year(Birthday) Nam,1 S,0 KH,0 MT" +
                                           " From Member where TreeID = " + TreeID + " AND Year(Birthday) BETWEEN " + Year + " AND " + Year1 +
                                           " UNION ALL" +
                                           " Select Year(Date_Create) Nam,0 S,1 KH,0 MT" +
                                           " From Member where TreeID = " + TreeID + " AND Year(Date_Create) BETWEEN " + Year + " AND " + Year1 + " AND TypeRelationship = 1" +
                                           " UNION ALL" +
                                           " Select ISNULL(Year(DateOfDeath),0) Nam, 0 S,0 KH,1 MT" +
                                           " From Member where TreeID = " + TreeID + " AND ISNULL(Year(DateOfDeath),0) BETWEEN " + Year + " AND " + Year1 +
                                       " ) AS A" +
                                       " Group by Nam";
                        var kq = dt.Database.SqlQuery<ReportTG>(Query).ToList();
                        //int? memberold = kq[0].Memberold;
                        //var IdNodept = dt.Database.SqlQuery<int>("Select * From CGP.dbo.Member Where TreeID=" + TreeID + " AND ID =" + ID).ToList();
                        //var kq = dt.Members.FromSql("EXECUTE CGP.dbo.GetMostPopularBlogsForUser {0}", TreeID)
                        //    .ToList();
                        return Json(kq, JsonRequestBehavior.AllowGet);
                    }
                    else if(Type == 1)
                    {
                        string Query = "Select row_number() OVER (ORDER BY A.AchievementID) STT,B.AchievementName TenTT,count(*) Sl" +
                                       " From AchievementDetail A ,ListAchievement B" +
                                       " Where A.AchievementID = B.IDAchievement AND Year(DateIncurred) BETWEEN " + Year + " AND " + Year1 + " AND A.TreeID = " + TreeID +
                                       "Group BY A.AchievementID,B.AchievementName";
                        var kq = dt.Database.SqlQuery<ReportTC>(Query).ToList();
                        //int? memberold = kq[0].Memberold;
                        //var IdNodept = dt.Database.SqlQuery<int>("Select * From CGP.dbo.Member Where TreeID=" + TreeID + " AND ID =" + ID).ToList();
                        //var kq = dt.Members.FromSql("EXECUTE CGP.dbo.GetMostPopularBlogsForUser {0}", TreeID)
                        //    .ToList();
                        return Json(kq, JsonRequestBehavior.AllowGet);
                    }
                    return Json(null, JsonRequestBehavior.AllowGet);
                }          
        }
        #endregion
    }
}