using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CayGiaPha.Helper;

namespace CayGiaPha.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            ViewBag.Show = 0;
            return View();
        }



        public ActionResult Login()
        {
            if (CurrentContext.IsLogged() == true)
            {
                return RedirectToAction("Index", "Home");
            }
            Account model = new Account();
            model.Username = "";
            
            return RedirectToAction("Index", "Home");
        }
        public ActionResult Login2(string u, string p)
        {
            using (CGPEntities dt = new CGPEntities())
            {
                string pass = StringUtils.MD5(p);

                Account us = dt.Accounts
                    .Where(pu => pu.Username == u && pu.Password == pass)
                    .FirstOrDefault();

                if (us != null)
                {
                    Session["isLogin"] = 1;
                    Session["user"] = us;
                    Session["IdUser"] = us.ID;
                    Session["username"] = us.Username;
                    ViewBag.Mes = 1;
                    //return Content("success");
                    return Json(new { success = true, responseText = "success" }, JsonRequestBehavior.AllowGet);
   
                }
                ViewBag.Mes = 2;
                //return Content("error");
                return Json(new { success = false, responseText = "error" }, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        //public ActionResult Login(Account model)
        public ActionResult Login(string u, string pa)
        {
            using (CGPEntities dt = new CGPEntities())
            {
                //string pass = StringUtils.MD5(model.Password);
                //Account us = dt.Accounts
                //    .Where(p => p.Username == model.Username && p.Password == pass)
                //    .FirstOrDefault();

                Account us = dt.Accounts
                    .Where(p => p.Username == u && p.Password == pa)
                    .FirstOrDefault();

                if (us != null)
                {
                    //if (model.Remember != null)
                    //{
                    //    //Cái này xử lí nếu người dùng check Ghi nhớ đăng nhập
                    //    Response.Cookies["userID"].Value = us.UserName.ToString();
                    //    Response.Cookies["userID"].Expires = DateTime.Now.AddDays(7);
                    //}
                    Session["isLogin"] = 1;
                    Session["user"] = us;
                    Session["IdUser"] = us.ID;
                    Session["username"] = us.Username;
                    ViewBag.Mes = 1;
                    //return Content("success");
                    return Json(new { success = true, responseText = "success" }, JsonRequestBehavior.AllowGet);
                }
                TempData["state"] = 5;
                ViewBag.Mes = 2;
                //return Content("error");
                return Json(new { success = false, responseText = "error" }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Logout()
        {
            CurrentContext.Destroy();
            return RedirectToAction("Index", "Home");
        }
        public ActionResult Register()
        {
            if (CurrentContext.IsLogged() == true)
            {
                return RedirectToAction("Index", "Home");
            }
            ViewBag.Mes = 3;
            return RedirectToAction("Index", "Home");
        }

        public ActionResult Register2(string un, string pw)
        {
            using (CGPEntities ctx = new CGPEntities())
            {
                Account us = ctx.Accounts.Where(p1 => p1.Username == un).FirstOrDefault();
                if (us != null)
                {
                    //return Content("error");
                    return Json(new { success = false, responseText = "error" }, JsonRequestBehavior.AllowGet);
                }
                else
                {

                    Account u = new Account();
                    u.Username = un;
                    //Mã hóa password
                    u.Password = StringUtils.MD5(pw);

                    try
                    {
                        ctx.Accounts.Add(u);
                        ctx.SaveChanges();

                       // return Content("success");
                        return Json(new { success = true, responseText = "success" }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        //return Content("error");
                        return Json(new { success = false, responseText = "error" }, JsonRequestBehavior.AllowGet);
                    }


                }

            }
        }

        [HttpPost]
        public ActionResult Register(Account model)
        {
            using (CGPEntities ctx = new CGPEntities())
            {
                //Check exists account
                //Account us = ctx.Accounts.Where(p => p.Email == model.Email.ToString()).FirstOrDefault();
                Account us = ctx.Accounts.Where(p => p.Username == model.Username.ToString()).FirstOrDefault();
                if (us != null)
                {

                    ViewBag.Mes = 2;
                    return RedirectToAction("Index", "Home");
                }
                else
                {

                    Account u = new Account();
                    u.Username = model.Username;
                    //u.Password = model.Password;
                    //Mã hóa password
                    u.Password = StringUtils.MD5(model.Password);

                    //u.Email = model.Email;

                    try
                    {
                        ctx.Accounts.Add(u);
                        ctx.SaveChanges();

                        @ViewBag.Error = false;


                        //Login(model);
                        ViewBag.Mes = 1;

                        // Response.Write("<script LANGUAGE='JavaScript' >alert('Đăng ký thành công. Đang chuyển về trang chủ')</script>");

                        return RedirectToAction("Index", "Home");
                    }
                    catch (Exception ex)
                    {
                        Response.Write("<script LANGUAGE='JavaScript' >alert('Lỗi.')</script>" + ex.ToString());
                    }


                }

                ViewBag.Mes = 2;
                return RedirectToAction("Index", "Home");
            }
        }

    }
}