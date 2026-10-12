using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

namespace FiveFingersTrainer
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            try
            {
                string appDir = AppDomain.CurrentDomain.BaseDirectory;
                string htmlPath = Path.Combine(appDir, "index.html");

                if (!File.Exists(htmlPath))
                {
                    MessageBox.Show("Could not locate index.html in:\n" + appDir, "5 F!NGERS by S1mplee67", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }

                // Check for Microsoft Edge or Chrome to run in dedicated app window mode
                string edgePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), @"Microsoft\Edge\Application\msedge.exe");
                if (!File.Exists(edgePath))
                {
                    edgePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), @"Microsoft\Edge\Application\msedge.exe");
                }

                string fileUri = new Uri(htmlPath).AbsoluteUri;

                if (File.Exists(edgePath))
                {
                    // Launch in clean standalone app window (no browser address bar/tabs)
                    ProcessStartInfo psi = new ProcessStartInfo
                    {
                        FileName = edgePath,
                        Arguments = "--app=\"" + fileUri + "\" --window-size=1200,850",
                        UseShellExecute = false
                    };
                    Process.Start(psi);
                }
                else
                {
                    // Default system browser fallback
                    Process.Start(new ProcessStartInfo
                    {
                        FileName = fileUri,
                        UseShellExecute = true
                    });
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error launching 5 F!NGERS:\n" + ex.Message, "5 F!NGERS by S1mplee67", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
