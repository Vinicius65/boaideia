using BoaIdeia.Api.Extensions;
using BoaIdeia.Api.Models;
using BoaIdeia.Api.ValueObject;
using BoaIdeia.Api.ViewModel;
using BoaIdeia.Api.ViewModel.Received;
using BoaIdeia.Test.Util;
using System.IO;
using System.Threading.Tasks;
using Xunit;

namespace BoaIdeia.Test.Cenarios
{
    public class ExtensionStripTest
    {
        [Theory]
        [InlineData("Vinicius", "Vinicius")]
        [InlineData("", "")]
        [InlineData(null, null)]
        [InlineData(" ", "")]
        [InlineData("  ", "")]
        [InlineData("   ", "")]
        [InlineData("    ", "")]
        [InlineData("    Vinicius", "Vinicius")]
        [InlineData("Vinicius    ", "Vinicius")]
        [InlineData("  Vinicius  ", "Vinicius")]
        [InlineData(" Vinicius ", "Vinicius")]
        [InlineData("      Vinicius  ", "Vinicius")]
        [InlineData("  Vinicius      ", "Vinicius")]
        [InlineData("  Vin   icius      ", "Vin   icius")]
        [InlineData("  Vi  nici  us      ", "Vi  nici  us")]
        [InlineData("  V i n i c i u s      ", "V i n i c i u s")]
        public void StripTest(string original, string excepted)
        {
            var strTest = original.Strip();
            Assert.True(strTest == excepted);
        }
    }
}
