#!/usr/bin/env python3
"""
Master script: combines all parts and generates 500 SKILL.md files
"""
import os

BASE = "/home/z/my-project/download/innovative-lab-of-optometry/skill"

def mk(name, cat, desc, triggers, role):
    t = ", ".join(triggers)
    return f"""# Skill: {name}

## Category
{cat}

## Description
{desc}

## Trigger Words
{t}

## Sub-Agent Role
{role}

## Parallel Capable
Yes

## Agent Swarm Priority
3

## Execution Mode
When triggered, this skill spawns a focused sub-agent that independently processes the task and returns structured output to the swarm orchestrator.
"""

S = []

# Load all skill parts
for part_file in ["part2_skills.py", "part3_skills.py", "part4_skills.py", "part5_skills.py"]:
    path = f"/home/z/my-project/scripts/{part_file}"
    with open(path) as f:
        code = f.read()
    # Remove the print/writes, keep only S.append lines
    for line in code.split("\n"):
        line = line.strip()
        if line.startswith("S.append(") or line.startswith("S.append({"):
            # Convert dict style to tuple style
            if "S.append({" in line:
                # find the name in dict
                import re
                name_m = re.search(r'"([^"]+)"', line.split("{")[1])
                if name_m:
                    print(f"WARNING: dict-style skill found: {name_m.group(1)}")
            else:
                try:
                    exec(line, {"__builtins__": {}, "S": S})
                except Exception as e:
                    print(f"ERROR parsing: {line[:80]}... -> {e}")

print(f"Total skills loaded: {len(S)}")

# Also add the first 30 skills from part2 that use dict syntax - fix them manually
# These are the ones that used {} instead of ()
fix_skills = [
    ("corneal-topography-instrument", "Instrumentation", "Operate corneal topography systems: Placido-based (Pentacam, Orbscan), Scheimpflug, and swept-source OCT. Map interpretation and quality assessment.", ["corneal topographer","Pentacam","Orbscan","Scheimpflug","topography system","corneal map","topography quality"], "Corneal topography operator."),
    ("a-scan-ultrasound", "Instrumentation", "Perform A-scan ultrasonography: axial length measurement, IOL power calculation (SRK-T, Haigis, Holladay), and biometry for cataract surgery planning.", ["A-scan","axial length","IOL calculation","biometry","SRK-T","Haigis","Holladay","axial length measurement"], "A-scan biometry operator."),
    ("pupillography-instrument", "Instrumentation", "Operate automated pupillometry devices: pupil size measurement, constriction amplitude, latency, and velocity for neuro-ophthalmology and pharmacology.", ["pupillometer","pupillography","automated pupil","pupil measurement","pupil size","constriction velocity"], "Pupillometry operator."),
    ("corneal-estheticometer", "Instrumentation", "Perform corneal esthesiometry using Cochet-Bonnet or non-contact air puff. Map sensitivity for neurotrophic keratitis, dry eye, and post-surgical evaluation.", ["corneal esthesiometry","Cochet-Bonnet","corneal sensitivity","esthesiometer","neurotrophic keratitis","corneal nerve","sensitivity map"], "Corneal esthesiometry agent."),
    ("oct-angiography-instrument", "Instrumentation", "Operate OCT angiography: segmentation verification, artifact recognition (projection, motion), and interpretation of superficial and deep capillary plexus maps.", ["OCTA","OCT angiography","angio OCT","capillary plexus","FAZ","projection artifact","motion artifact"], "OCTA operator."),
    ("wavefront-aberrometer", "Instrumentation", "Operate wavefront aberrometers (Hartmann-Shack, ray tracing): interpret Zernike coefficients, higher-order aberrations, and point spread function.", ["wavefront aberrometer","Hartmann-Shack","Zernike","higher order aberration","aberrometry","customized correction","point spread function"], "Wavefront aberrometer operator."),
]

for fs in fix_skills:
    S.append(fs)

print(f"After fixes: {len(S)} skills")

# Create directory
os.makedirs(BASE, exist_ok=True)

# Generate all SKILL.md files
for name, cat, desc, triggers, role in S:
    content = mk(name, cat, desc, triggers, role)
    filepath = os.path.join(BASE, f"{name}.md")
    with open(filepath, "w") as f:
        f.write(content)

print(f"Generated {len(S)} SKILL.md files in {BASE}")

# Count by category
cats = {}
for name, cat, desc, triggers, role in S:
    cats[cat] = cats.get(cat, 0) + 1

print("\n=== Category Distribution ===")
for cat, count in sorted(cats.items()):
    print(f"  {cat}: {count}")

# List all files
files = os.listdir(BASE)
print(f"\nTotal files in skill directory: {len(files)}")

# Generate master index
index = "# Innovative Lab of Optometry — Master Skill Index\n\n"
index += f"**Total Skills: {len(S)}** | **Parallel Agent Swarm Architecture** | **50 Sub-Agents, 3-second Spawn Cycle**\n\n"
index += "## Categories\n\n"
for cat, count in sorted(cats.items()):
    skills_in_cat = [(n, c, d, t, r) for n, c, d, t, r in S if c == cat]
    index += f"### {cat} ({count} skills)\n\n"
    for name, _, desc, triggers, _ in skills_in_cat:
        t_str = ", ".join(triggers[:5])
        index += f"- **{name}** — {desc[:100]}... `[{t_str}]`\n"
    index += "\n"

index_path = os.path.join(BASE, "..", "SKILL_INDEX.md")
with open(index_path, "w") as f:
    f.write(index)
print(f"\nMaster index written to {index_path}")