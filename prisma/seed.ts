import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ssn_industries?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.rFQItem.deleteMany({});
  await prisma.rFQ.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Cleared existing database entries.');

  // Create Categories
  const roofingSheets = await prisma.category.create({
    data: {
      name: 'Premium Roofing Sheets',
      slug: 'roofing-sheets',
      description: 'High-tensile zinc-aluminium and color-coated steel sheets for premium industrial and residential roofing.',
    },
  });

  const steelPipes = await prisma.category.create({
    data: {
      name: 'Steel Pipes',
      slug: 'steel-pipes',
      description: 'Black and Galvanized ERW steel pipes, hollow sections (SHS, RHS) for robust structural use.',
    },
  });

  const structuralSteel = await prisma.category.create({
    data: {
      name: 'Structural Steel',
      slug: 'structural-steel',
      description: 'Heavy duty hot-rolled structural members including I-beams, channels, and angles.',
    },
  });

  const tmtBars = await prisma.category.create({
    data: {
      name: 'TMT Bars',
      slug: 'tmt-bars',
      description: 'Thermo-Mechanically Treated reinforcement bars with high yield strength and ductility.',
    },
  });

  const upvcRoofing = await prisma.category.create({
    data: {
      name: 'UPVC Roofing',
      slug: 'upvc-roofing',
      description: 'Corrosion-free, thermal-insulating UPVC roofing profiles for chemical and coastal environments.',
    },
  });

  const buildingMaterials = await prisma.category.create({
    data: {
      name: 'Industrial Building Materials',
      slug: 'industrial-materials',
      description: 'Critical installation accessories including Z/C purlins, deck sheets, and fastener solutions.',
    },
  });

  console.log('Successfully created product categories.');

  // Create Products
  // 1. Roofing Sheets
  await prisma.product.create({
    data: {
      name: 'SSN Aluzinc Premium Roofing Sheet',
      slug: 'ssn-aluzinc-premium',
      description: 'Premium zinc-aluminium alloy coated steel sheet offering superior corrosion resistance and heat reflectivity.',
      categoryId: roofingSheets.id,
      specs: {
        material: 'Aluminium-Zinc Alloy Coated Steel (55% Al, 43.4% Zn, 1.6% Si)',
        coatingMass: 'AZ-150 gsm',
        thicknessOptions: ['0.45 mm', '0.50 mm', '0.60 mm'],
        width: '1072 mm (overall width), 1000 mm (effective cover width)',
        standards: 'IS 15965 / ASTM A792',
      },
    },
  });

  // 2. Steel Pipes
  await prisma.product.create({
    data: {
      name: 'SSN Rectangular Hollow Section (RHS)',
      slug: 'ssn-rhs-pipe',
      description: 'High-strength structural rectangular hollow steel section, widely used in columns and frames.',
      categoryId: steelPipes.id,
      specs: {
        grade: 'YS 250 / YS 310',
        dimensions: '40x20 mm to 200x100 mm',
        thickness: '2.0 mm to 6.0 mm',
        length: '6.0 meters (custom lengths available on request)',
        standards: 'IS 4923 / EN 10219',
      },
    },
  });

  // 3. Structural Steel
  await prisma.product.create({
    data: {
      name: 'SSN Universal I-Beam',
      slug: 'ssn-universal-i-beam',
      description: 'Hot rolled steel structural beam designed to support heavy structural cross-loads.',
      categoryId: structuralSteel.id,
      specs: {
        grade: 'E250BR / E350BR',
        flangeWidth: '100 mm to 250 mm',
        nominalWeight: '11.5 kg/m to 122 kg/m',
        depth: '116 mm to 600 mm',
        standards: 'IS 2062 / IS 808',
      },
    },
  });

  // 4. TMT Bars
  await prisma.product.create({
    data: {
      name: 'SSN TMT Fe 550D Rebars',
      slug: 'ssn-tmt-fe-550d',
      description: 'High ductility thermo-mechanically treated reinforcement bar ideal for earthquake-resistant structures.',
      categoryId: tmtBars.id,
      specs: {
        grade: 'Fe 550D',
        diameters: ['8 mm', '10 mm', '12 mm', '16 mm', '20 mm', '25 mm', '32 mm'],
        chemicalComposition: 'Low Carbon, Low Sulphur & Phosphorus',
        standards: 'IS 1786',
      },
    },
  });

  // 5. UPVC Roofing
  await prisma.product.create({
    data: {
      name: 'SSN 3-Layer Corrugated UPVC Sheet',
      slug: 'ssn-3-layer-upvc',
      description: 'Co-extruded three-layer UPVC roofing sheet providing excellent sound dampening and anti-corrosion properties.',
      categoryId: upvcRoofing.id,
      specs: {
        structure: '3-Layer Co-extruded (ASA Layer + Thermal Insulation + Structural Base)',
        thickness: '2.0 mm / 2.5 mm / 3.0 mm',
        width: '1130 mm (overall), 1050 mm (effective)',
        thermalConductivity: '0.325 W/mK',
        standards: 'GB/T 13542',
      },
    },
  });

  console.log('Successfully seeded database products.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
