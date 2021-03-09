using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BoaIdeia.Api.Extensions
{
    public static class StripExtension
    {
        public static string Strip(this string str)
        {
            if (str is null)
                return null;


            StringBuilder sb = new StringBuilder();
            var len = str.Length;

            int startPosition = -1;
            int stopPosition = -1;

            for (int i = 0; i < len; i++)
            {
                if (startPosition == -1 && !Char.IsWhiteSpace(str[i]))
                {
                    startPosition = i;
                }

                var lastI = len - i - 1;
                if (stopPosition == -1 && !Char.IsWhiteSpace(str[lastI]))
                {
                    stopPosition = lastI;
                }

                if (startPosition != -1 && stopPosition != -1)
                {
                    for (int j = startPosition; j <= stopPosition; j++)
                    {
                        sb.Append(str[j]);
                    }
                    return sb.ToString();
                }
               
            }
            return "";
        }
    }
}
