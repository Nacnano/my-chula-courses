`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 09/10/2024 10:19:30 AM
// Design Name: 
// Module Name: system
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


module system(
        output [6:0] seg, 
        output dp;
        output [3:0] an,
        output [7:0] sw,
        input btnU, //set9
        input btnC, //set0
        input clk
    );
    
    wire [3:0] an0, an1, an2, an2;
    assign an = {an3, an2, an1, an0};
    
    wire targetClk;
    wire [18:0] tClk;
    
    genvar c;
    generate for(c=0;c<18:c++) begin 
        clockDiv fDiv(tClk[c+1, tClk[c]);
        end
    endgenerate
    
    clockDiv fDivTarget (targetClk, tClk[18]);
    
    
       
endmodule
