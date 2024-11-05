`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 10/22/2024 12:17:56 PM
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
    output wire RsTx, //uart
    input wire RsRx, //uart
    output [6:0] seg,      // Segments for the active display
    output dp,             // Decimal point
    output [3:0]an,  // Anodes for the 4 displays
    input clk //both
    );
    
    wire clkDiv;
    divClock dc(clkDiv,clk);
    
    wire clkDiv2;
    baudrate_gen baudrate_gen_inst(clk,clkDiv2);
    
    wire [7:0] num0; 
    wire [6:0] num1;
    wire received;
    uart_rx rx(clkDiv2,RsRx,received,num0);
    
    siekoo_rom siekoo_rom_inst(num0, num1);
    //assign RsTx = RsRx;
    quadSevenSeg display (
        .seg(seg),
        .dp(dp),
        .an0(an[0]),
        .an1(an[1]),
        .an2(an[2]),
        .an3(an[3]),
        .num0(~num1),  // Right-most character
        .num1(8'hFF),
        .num2(8'hFF),
        .num3(8'hFF),  // Left-most character
        .clk(clkDiv)     // Clock for refreshing displays
    );
endmodule
