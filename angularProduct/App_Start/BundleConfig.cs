using System.Web;
using System.Web.Optimization;

namespace angularProduct
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/angular_es5").Include(
                      /*
                      "~/Scripts/libs/runtime-es2015.js",
                      "~/Scripts/libs/polyfills-es2015.js",
                      "~/Scripts/libs/vendor-es2015.js",
                      "~/Scripts/libs/main-es2015.js"
                      */
                      "~/Client/dist/angularProduct/runtime-es2015.*",
                      "~/Client/dist/angularProduct/runtime-es5.*",
                      "~/Client/dist/angularProduct/polyfills-es5.*",
                      "~/Client/dist/angularProduct/polyfills-es2015.*",
                      // "~/Client/dist/angularProduct/vendor-es5.*",
                      "~/Client/dist/angularProduct/main-es2015.*",
                      "~/Client/dist/angularProduct/main-es5.*"
                      /*
                      "~/Client/dist/angularProduct/runtime.js",
                      "~/Client/dist/angularProduct/polyfills.js",
                      "~/Client/dist/angularProduct/vendor.js",
                      "~/Client/dist/angularProduct/main.js"
                      */
                      ));
        }
    }
}
