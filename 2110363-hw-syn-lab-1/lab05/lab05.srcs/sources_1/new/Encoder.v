`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 09/30/2023 09:44:11 PM
// Design Name: 
// Module Name: Encoder
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////


module Encoder(
    input wire [3:0] A,
    output wire [6:0] Z 
    );
    assign Z = (A == 4'b0000) ? 7'b0000001 :
            (A == 4'b0001) ? 7'b1001111 :
            (A == 4'b0010) ? 7'b0010010 :
            (A == 4'b0011) ? 7'b0000110 :
            (A == 4'b0100) ? 7'b1001100 :
            (A == 4'b0101) ? 7'b0100100 :
            (A == 4'b0110) ? 7'b0100000 :
            (A == 4'b0111) ? 7'b0001101 :
            (A == 4'b1000) ? 7'b0000000 :
            (A == 4'b1001) ? 7'b0000100 :
            (A == 4'b1010) ? 7'b0001000 :
            (A == 4'b1011) ? 7'b1100000 :
            (A == 4'b1100) ? 7'b0110001 :
            (A == 4'b1101) ? 7'b1000010 :
            (A == 4'b1110) ? 7'b0110000 :
            7'b0111000;
endmodule